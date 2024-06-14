from flask import Flask, request, jsonify
import util

# Initializing a Flask application
app = Flask(__name__)

# Defining an endpoint for classifying images
@app.route("/classify_image", methods = ["GET", "POST"])
def classify_image():
    image_data = request.form["image_data"]
    response = jsonify(util.classify_image(image_data))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Celebrity Image Classifier")
    # Loading saved artifacts necessary for classification from the 'util' module
    util.load_saved_artifacts()
    app.run(port=5000)