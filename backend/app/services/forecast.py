import json
from pathlib import Path

def get_all_locations():
    data_file = Path(__file__).parent.parent / "data" / "locations.json"

    print("Reading from:", data_file)

    with open(data_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(data[0])

    return data