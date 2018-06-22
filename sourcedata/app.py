# import necessary libraries
import json
from flask import (
    Flask,
    render_template,
    jsonify,
    request)


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# Create a list to hold our data

sourceFile = open("overall_gun_deaths_by_year.json")
my_data = json.load(sourceFile)

sourceFile2 = open("gun_deaths in top 5 states.json")
my_data2 = json.load(sourceFile2)

sourceFile3 = open("Cause_of_Gun_Deaths_by_City_State_Year.json")
my_data3 = json.load(sourceFile3)


@app.route("/api/gun_deaths", methods=["GET"])
def data():
    return jsonify(my_data)

@app.route("/api/tops", methods=["GET"])
def data2():
    return jsonify(my_data2)

@app.route("/api/causes", methods=["GET"])
def data3():
    return jsonify(my_data3)

@app.route("/")
def home():
    return "Welcome to the Gun data statistics!"


if __name__ == "__main__":
    app.run(debug=True)
