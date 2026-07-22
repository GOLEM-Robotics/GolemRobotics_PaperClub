import re

with open("hooks/build_curriculum_graph.py", "r") as f:
    content = f.read()

# Extract assign_session_positions
match = re.search(r"def assign_session_positions\(.*?return session_edges\n", content, re.DOTALL)
func = match.group(0)

# Remove it from the current location
content = content.replace(func, "")

# Insert it before build_dataset
content = content.replace("def build_dataset(", func + "\n\ndef build_dataset(")

with open("hooks/build_curriculum_graph.py", "w") as f:
    f.write(content)
