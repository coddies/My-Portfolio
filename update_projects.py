import sys

# Read final content
with open('final_projects.html', 'r', encoding='utf-8') as f:
    new_content = f.read()

# Read current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start = -1
end = -1
for i, line in enumerate(lines):
    if '<section id="card-4"' in line: start = i
    if '<section id="card-5"' in line: end = i

if start == -1 or end == -1:
    print("Could not find card-4 or card-5 markers")
    sys.exit(1)

# Replace the inner part of card-4
lines[start+1:end] = [new_content + '\n']

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Success")
