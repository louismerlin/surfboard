from flask import Flask, render_template
import yaml
import requests

with open("../config.yaml", "r") as yamlfile:
    CONFIG = yaml.load(yamlfile, Loader=yaml.FullLoader)

r = requests.get(CONFIG["scoreboard_url"])
scoreboard = r.json()

app = Flask(__name__)

@app.route("/")
def surfboard():
    return render_template("surfboard.html", scoreboard=scoreboard)
