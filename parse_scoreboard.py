def parse_scoreboard(data):
    services = [
        "MerkleChat",
        "The Lost Bottle",
        "Lonely Island",
        "Pirate Birthday Planner",
        "Treasury",
        "Veighty Machinery",
        "TreasureHunt",
    ]
    data["services"] = services
    data["statuses"] = data["status-descriptions"]
    return data
