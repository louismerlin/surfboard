from flask import Flask, render_template
import yaml
import requests
import json
import time
import threading

from parse_scoreboard import parse_scoreboard

# FLASK WEB STUFF

app = Flask(__name__)

@app.route("/")
def surfboard():
    return render_template("surfboard.html")


@app.route("/scoreboard")
def scoreboard():
    global all_scoreboards
    return json.dumps(all_scoreboards)


# SCOREBOARD FETCHING LOGIC

with open("../config.yaml", "r") as yamlfile:
    CONFIG = yaml.load(yamlfile, Loader=yaml.FullLoader)

def save_scoreboards():
    global all_scoreboards
    scoreboard_file = CONFIG["json_file"]
    with open(scoreboard_file, 'w') as file:
        json.dump(all_scoreboards, file)

def do_loop():
    global all_scoreboards
    url = CONFIG["scoreboard_url"]
    r = requests.get(url)
    current_scoreboard = parse_scoreboard(r.json())
    if current_scoreboard["tick"] not in all_scoreboards:
        all_scoreboards[current_scoreboard["tick"]] = current_scoreboard
        save_scoreboards()

def run_loop():
    scoreboard_file = CONFIG["json_file"]
    global all_scoreboards
    all_scoreboards = {}
    with open(scoreboard_file, 'r') as file:
        all_scoreboards = json.load(file)
    while True:
        do_loop()
        rate = CONFIG["refresh_rate"]
        time.sleep(rate - time.time() % rate)

thread = threading.Thread(target=run_loop)
thread.start()