import json
from pathlib import Path


def get_all_locations():

    data_file = (
        Path(__file__).resolve().parent.parent
        / "data"
        / "locations.json"
    )

    with open(data_file, "r", encoding="utf-8") as file:
        return json.load(file)