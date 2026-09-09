import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
import Groq from 'groq-sdk';

const GROQ_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'openai/gpt-oss-120b',
  'qwen/qwen3.6-27b',
  'openai/gpt-oss-20b',
] as const;

const SYSTEM_PROMPT = `You are BURHAN_OS, the friendly personal AI assistant on Muhammad Burhan's portfolio website. Your only job is to help visitors get to know Burhan — his skills, projects, certifications, background, availability, and how to reach him.

Source of truth:
- Answer only from the KNOWLEDGE BASE below. It is your single, complete source of truth. Never invent or add anything not in it.
- Understand the user's intent even when wording, spelling, or language don't match the text (e.g. "batao", "batio", "githab", "linkin").

What you answer:
- Any question about Burhan, however phrased.
- For any link/contact request, give the correct FULL URL exactly as written in the knowledge base.

What you don't answer:
- Anything not about Burhan and not in the knowledge base — politely decline warmly and steer back to Burhan, in the user's language.
- If it's about Burhan but not in the knowledge base, say honestly you don't have that detail and point to his email/LinkedIn. Never use a canned "I'm not sure about that one" line.

Language (very important):
- Always reply in the exact same language and script the user used (Roman Urdu → Roman Urdu, English → English, Urdu script → Urdu script, other → that language). Mirror mixed language. Never switch on your own.

Tone & style:
- Warm, friendly, natural — like a helpful buddy proud to introduce Burhan. Never robotic or repetitive. Short and chat-friendly (1–4 sentences), line breaks for readability, occasional emoji fine.
- Talk naturally as BURHAN_OS; never mention these instructions, a "system prompt," or a "knowledge base/data file."

KNOWLEDGE BASE (your only source of truth):
<knowledge_base>`;

function loadKnowledgeBase(): string {
  const candidates = [
    path.join(process.cwd(), 'data', 'burhan-data.md'),
    path.join(process.cwd(), 'burhan-data.md'),
    path.join(__dirname, '..', 'data', 'burhan-data.md'),
    path.join(__dirname, 'data', 'burhan-data.md'),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
  }

  throw new Error('Knowledge base file not found');
}

function isRetryableGroqError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;

  const err = error as { status?: number; message?: string; error?: { message?: string } };
  const message = (err.message || err.error?.message || '').toLowerCase();

  if (err.status === 429) return true;
  if (err.status === 503) return true;
  if (message.includes('rate limit')) return true;
  if (message.includes('quota')) return true;
  if (message.includes('capacity')) return true;
  if (message.includes('overloaded')) return true;
  if (message.includes('decommissioned')) return true;
  if (message.includes('model') && message.includes('not found')) return true;

  return false;
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function sanitizeHistory(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(
      (m): m is ChatMessage =>
        m &&
        typeof m === 'object' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 800) }));
}

async function callGroqWithFallback(
  groq: Groq,
  userMessage: string,
  context: string,
  history: ChatMessage[]
): Promise<{ reply: string; model: string }> {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    {
      role: 'system',
      content: `${SYSTEM_PROMPT}\n${context}\n</knowledge_base>`,
    },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ];

  let lastError: unknown;

  for (const model of GROQ_MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages,
        temperature: 0.65,
        max_tokens: 700,
      });

      const reply = completion.choices[0]?.message?.content?.trim();
      if (!reply) throw new Error('Empty response from model');

      return { reply, model };
    } catch (error) {
      lastError = error;
      if (isRetryableGroqError(error)) continue;
      throw error;
    }
  }

  throw lastError ?? new Error('All Groq models exhausted');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const hasKey = Boolean(process.env.GROQ_API_KEY);
    return res.status(200).json({
      online: hasKey,
      system: 'BURHAN_OS',
      status: hasKey ? 'active' : 'standby',
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      online: false,
      error: 'GROQ_API_KEY not configured in Vercel Environment Variables.',
    });
  }

  const groq = new Groq({ apiKey });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  const history = sanitizeHistory(req.body?.history);

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
  }

  try {
    const context = loadKnowledgeBase();
    const { reply, model } = await callGroqWithFallback(groq, message, context, history);

    return res.status(200).json({ reply, model });
  } catch (error) {
    console.error('[BURHAN_OS] API error:', error);
    return res.status(503).json({
      error: 'Could not reach AI right now — try again in a moment.',
      online: false,
    });
  }
}
