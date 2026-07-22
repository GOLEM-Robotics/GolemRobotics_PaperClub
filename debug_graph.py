import sys
sys.path.insert(0, str(sys.path[0]) + '/hooks')
import hooks.build_curriculum_graph as b
from pathlib import Path

repo_root = Path('.')
dataset = b.build_dataset(repo_root)
print("URL in Python:", dataset["topics"][0]["url"])
