import requests

from datetime import datetime, timedelta
import os
from flask_cors import *
from flask import *

import json

# import cv2
import os
import mysql.connector
app = Flask(__name__)
cros = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/compile', methods=['POST'], strict_slashes=False)
def w2():
    try:
        r = request.json
        print(r)

        url = 'https://api.jdoodle.com/v1/execute'
        myobj = {"script": r["code"],
                 "language": r["language"],
                 "versionIndex": "0",
                 "clientId": "a5fb09bd6f98a2d4a79e8d0c1d8c4d79",
                 "clientSecret": "d6c2370470ce502a1ac1754710218a3fd3b076d3d877961369f57a22eafdb8a3"}

        x = requests.post(url, json=myobj)

        return (x.text)
    except:
        return ("server error")


if __name__ == "__main__":
    app.run(debug=True)
