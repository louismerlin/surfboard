from flask import Flask, render_template
import yaml
import requests
import json

from parse_scoreboard import parse_scoreboard

with open("../config.yaml", "r") as yamlfile:
    CONFIG = yaml.load(yamlfile, Loader=yaml.FullLoader)

r = requests.get(CONFIG["scoreboard_url"])
current_scoreboard = parse_scoreboard(r.json())

app = Flask(__name__)


@app.route("/")
def surfboard():
    return render_template("surfboard.html")


@app.route("/scoreboard")
def scoreboard():
    return json.dumps(current_scoreboard)
