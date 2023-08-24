from flask import Flask,request,jsonify

import sqlite3
from flask_cors import CORS,cross_origin

connection = sqlite3.connect("users.db")
cursor = connection.cursor()

#command = "CREATE TABLE user(email TEXT,password TEXT)"
#cursor.execute(command)

cursor.execute("INSERT INTO user VALUES('maho@gmail.com', '12345607')")
cursor.execute("INSERT INTO user VALUES('nony@gmail.com', 'password')")

connection.commit() 