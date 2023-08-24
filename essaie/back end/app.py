from flask import Flask,request,jsonify

import sqlite3
from flask_cors import CORS,cross_origin

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'POST':
           connection = sqlite3.connect("users.db")
           cursor = connection.cursor()

           email = request.form['email']
           password = request.form['password']


           query = "SELECT * FROM user WHERE email='+email+' AND password='+ password +' "
           cursor.execute(query)

           results = cursor.fetchall()
