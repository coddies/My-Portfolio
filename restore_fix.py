import sys

def read_file(path):
    for enc in ['utf-8-sig', 'utf-16', 'latin-1']:
        try:
            with open(path, 'r', encoding=enc) as f:
                return f.readlines()
        except:
            continue
    return []

# 1. Get original Skills section from index_prev.html
prev_lines = read_file('index_prev.html')

start_skill_prev = -1
end_skill_prev = -1
for i, line in enumerate(prev_lines):
    if '<section id="card-3"' in line: start_skill_prev = i
    if '<section id="card-4"' in line: end_skill_prev = i

if start_skill_prev == -1 or end_skill_prev == -1:
    print("Could not find section bounds in prev")
    sys.exit(1)

skills_code = prev_lines[start_skill_prev+1:end_skill_prev]

# 2. Get the new prototypes for Projects
with open('proj_prototypes.html', 'r', encoding='utf-8') as f:
    proj_code = f.read()

# 3. Read current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    current_lines = f.readlines()

start_skill_curr = -1
start_proj_curr = -1
start_ach_curr = -1

for i, line in enumerate(current_lines):
    if '<section id="card-3"' in line: start_skill_curr = i
    if '<section id="card-4"' in line: start_proj_curr = i
    if '<section id="card-5"' in line: start_ach_curr = i

if start_skill_curr == -1 or start_proj_curr == -1 or start_ach_curr == -1:
    print("Could not find section bounds in current")
    sys.exit(1)

# Find insertion point in current card-4 (before closing div of card-inner)
insert_pt = -1
for i in range(start_ach_curr - 1, start_proj_curr, -1):
    if '</div>' in current_lines[i]:
        insert_pt = i
        break

if insert_pt == -1:
    print("Could not find insert point in current")
    sys.exit(1)

# Reconstruct index.html
new_html = current_lines[:start_skill_curr+1] + skills_code + current_lines[start_proj_curr:insert_pt] + [proj_code + '\n'] + current_lines[insert_pt:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_html)
print("Success")
