from flask import Flask,request,jsonify

import sqlite3
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/api/medicament',methods=['GET'])
def root():
    db= sqlite3.connect('posts.db')
    cursor = db.cursor()
  #  cursor.execute('CREATE TABLE medicament(id INTEGER PRIMARY KEY AUTOINCREMENT,nomMed TEXT, prix INTEGER, stock INTEGER)')
  

    cursor.execute('SELECT * FROM medicament')
    data = cursor.fetchall()
    db.close()
    meds  = []
    for row in data:
         med = {'id':row[0],'nomMed':row[1],'prix':row[2],'stock':row[3]}
         meds.append(med)
  
    return jsonify(meds)

@app.route('/api/medicament',methods=['POST'])
def create():
    db=   sqlite3.connect('posts.db')
    cursor = db.cursor()
    data = request.get_json()
    nomMed = data["nomMed"]
    prix = data["prix"]
    stock = data["stock"]

    
    cursor.execute('INSERT INTO medicament(nomMed, priX, stock) VALUES("%s", "%s", "%s")' % (nomMed, prix, stock))
    db.commit()

    db.close()
    return jsonify("medicament a été bien enregistrer")

@app.route('/api/medicament/<_id>',methods=['PUT'])
def update(_id):
       db=   sqlite3.connect('posts.db')
       cursor = db.cursor()

       data = request.get_json()
       nomMed = data["nomMed"]
       prix = data["prix"]
       stock = data["stock"]
       cursor.execute('UPDATE medicament SET nomMed="%s", prix="%s", stock="%s" WHERE id=%s' % (nomMed, prix, stock, _id))
       db.commit()

       db.close()
       return jsonify("fa vita ")

@app.route('/api/medicament/<_id>',methods=['DELETE'])
def delete(_id):
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
     cursor.execute('DELETE  FROM medicament WHERE id=%s' % _id)
     db.commit()
     return jsonify("delete")

####AFICHE L'INFORMATION D'UN MEDICAMENT 
@app.route('/api/medicament/<_id>',methods=['GET'])
def getInfoMed(_id):
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
     cursor.execute('SELECT *  FROM medicament WHERE id=%s' % _id)
     data = cursor.fetchall()
     meds  = []
     for row in data:
         med = {'id':row[0],'nomMed':row[1],'prix':row[2],'stock':row[3]}
         meds.append(med)
  
   
     db.commit()
     return jsonify(meds)

                            #TABLE ACHAT
@app.route('/api/achat' , methods=['GET'] )
@cross_origin()
def achat():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()

     cursor.execute('SELECT achat.idA,medicament.nomMed AS med,client.nomClient AS nomClient,achat.nombre,achat.date FROM achat,medicament,client  WHERE achat.nomMed=medicament.id AND achat.nom=client.idClient')
     data = cursor.fetchall()
     db.close()
     achats  = []
     for row in data:
         achat = {'idA':row[0],'med':row[1],'nomClient':row[2],'nombre':row[3],'date':row[4]}
         achats.append(achat)
  
     return jsonify(achats)


@app.route('/api/achat', methods = ['POST'])
def creat():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
     data = request.get_json()
     nomMed = data["nomMed"]
     nom = data["nom"]
     nombre = data["nombre"]
     date = data["date"]
     
    # cursor.execute('INSERT INTO achat(nomMed,nom,nombre,date) VALUES("%s","%s","%s","%s")' % (nomMed,nom,nombre,date))
    # cursor.execute('UPDATE medicament SET stock=stock-"%s" WHERE id=%s' % (nombre,nomMed))
     cursor.execute('SELECT stock  FROM medicament WHERE id=%s' % nomMed)
     # cursor.execute('INSERT INTO achat(nomMed,nom,nombre,date) VALUES("%s","%s","%s","%s")' % (nomMed,nom,nombre,date))
    
     data = cursor.fetchall()
     stock_dispo  = []
     for row in data:
         med = {'stock':row[0]}
         stock_dispo.append(med)
     stock_dispo = stock_dispo[0]["stock"]
     qtStock = int(nombre)
     stock = stock_dispo - qtStock
     if(qtStock<=stock_dispo):
          cursor.execute('INSERT INTO achat(nomMed,nom,nombre,date) VALUES("%s","%s","%s","%s")' % (nomMed,nom,nombre,date))
          cursor.execute('UPDATE medicament SET stock="%s" WHERE id=%s' % (stock,nomMed))
          db.commit()
          db.close()

          return jsonify("enregistrer et modifier")
     else:
          return jsonify({
               "status":1,
               "data":"stock insuffisant"
          })
     
     
@app.route('/api/achat/<idA>',methods=['PUT'])
def modifier(idA):
       db=   sqlite3.connect('posts.db')
       cursor = db.cursor()

       data = request.get_json()
       nomMed = data["nomMed"]
       nom = data["nom"]
       nombre = data["nombre"] 
       date = data["date"]
       cursor.execute('UPDATE achat SET nomMed="%s" , nom="%s", nombre="%s", date="%s" WHERE idA=%s' % (nomMed, nom, nombre, date, idA))
       db.commit()

       db.close()
       return jsonify("fa vita ")

@app.route('/api/achat/<idA>',methods=['DELETE'])
def supr(idA):
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
     cursor.execute('DELETE  FROM achat WHERE idA=%s' % idA)
     db.commit()
     return jsonify("delete")


####AFICHE L'INFORMATION D'ACHAT 
@app.route('/api/achat/<idA>',methods=['GET'])
def getInfoAchat(idA):
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
     cursor.execute('SELECT *  FROM achat WHERE idA=%s' % idA)
     data = cursor.fetchall()
     achats  = []
     for row in data:
         achat = {'idA':row[0],'nomMed':row[1],'nom':row[2],'nombre':row[3],'date':row[4]}
         achats.append(achat)
     return jsonify(achats)

              #TABLE ENTRER
@app.route('/api/entrer', methods=['GET']) 
def entre():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
    # cursor.execute('CREATE TABLE entrer(idEnt INTEGER PRIMARY KEY AUTOINCREMENT, nomMed TEXT, stockEnt INTEGER, dateEnt DATE)')
     #db.commit()
    
     cursor.execute('SELECT entrer.idEnt, medicament.nomMed, entrer.stockEnt,entrer.dateEnt FROM entrer INNER JOIN medicament WHERE entrer.nomMed=medicament.id')
     data = cursor.fetchall()
     db.close()
     entree  = []
     for row in data:
         entrer = {'idEnt':row[0],'nomMed':row[1],'stockEnt':row[2],'dateEnt':row[3]}
         entree.append(entrer)
  
     return jsonify(entree)



@app.route('/api/entrer',methods=['POST'])
def creer():
    db=   sqlite3.connect('posts.db')
    cursor = db.cursor()
    data = request.get_json()
    nomMed = data["nomMed"]
    stockEnt = data["stockEnt"]
    dateEnt = data["dateEnt"]

    
   # cursor.execute('INSERT INTO entrer(nomMed, stockEnt, dateEnt) VALUES("%s", "%s", "%s")' % (nomMed, stockEnt, dateEnt))
   # db.commit()

   # db.close()
  #  return jsonify("medicament a été bien enregistrer")
    
    cursor.execute('SELECT stock  FROM medicament WHERE id=%s' % nomMed)
    
    data = cursor.fetchall()
    stock_dispo  = []
    for row in data:
      med = {'stock':row[0]}
      stock_dispo.append(med)
      stock_dispo = stock_dispo[0]["stock"]
    qtEntrer = int(stockEnt)
    stock = stock_dispo + qtEntrer
         
    cursor.execute('INSERT INTO entrer(nomMed, stockEnt, dateEnt) VALUES("%s", "%s", "%s")' % (nomMed, qtEntrer, dateEnt))
    cursor.execute('UPDATE medicament SET stock="%s" WHERE id=%s' % (stock,nomMed))
    db.commit()
    db.close()

    return jsonify("enregistrer et modifier")


@app.route('/api/entrer/<_idEnt>',methods=['PUT'])
def updt(_idEnt):
       db=   sqlite3.connect('posts.db')
       cursor = db.cursor()

       data = request.get_json()
       nomMed = data["nomMed"]
       dateEnt = data["dateEnt"]
       stockEnt = data["stockEnt"]
       cursor.execute('UPDATE entrer SET nomMed="%s", dateEnt="%s", stockEnt="%s" WHERE idEnt=%s' % (nomMed, dateEnt, stockEnt, _idEnt))
       db.commit()

       db.close()
       return jsonify("fa vita ")
          

@app.route('/api/entrer/<_idEnt>',methods=['DELETE'])
def supEntrer(_idEnt):
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
     cursor.execute('DELETE  FROM entrer WHERE idEnt=%s' % _idEnt)
     db.commit()
     return jsonify("delete")

####AFICHE L'INFORMATION D'UN MEDICAMENT 
@app.route('/api/entrer/<_idEnt>',methods=['GET'])
def getInfoEnt(_idEnt):
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
     cursor.execute('SELECT *  FROM entrer WHERE idEnt=%s' % _idEnt)
     data = cursor.fetchall()
     entrees  = []
     for row in data:
         entrer = {'idEnt':row[0],'nomMed':row[1],'stockEnt':row[2],'dateEnt':row[3]}
         entrees.append(entrer)
  
   
     db.commit()
     return jsonify(entrees)
###############################################TOTAL MEDICAMENT #######################################
@app.route('/api/countMedicament')
def getCountMed():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
    # cursor.execute('CREATE TABLE entrer(idEnt INTEGER PRIMARY KEY AUTOINCREMENT, nomMed TEXT, stockEnt INTEGER, dateEnt DATE)')
     #db.commit()
    
     cursor.execute('SELECT SUM(stock) FROM medicament')
     data = cursor.fetchall()
     db.close()
     stock  = []
     for row in data:
         stocks = {'stock':row[0]}
         stock.append(stocks)
  
     return jsonify(stocks)

###############################################TOTAL D'ACHAT #######################################
@app.route('/api/countAchat')
def getCountAchat():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
    # cursor.execute('CREATE TABLE entrer(idEnt INTEGER PRIMARY KEY AUTOINCREMENT, nomMed TEXT, stockEnt INTEGER, dateEnt DATE)')
     #db.commit()
    
     cursor.execute('SELECT SUM(nombre) FROM achat')
     data = cursor.fetchall()
     db.close()
     stock  = []
     for row in data:
         stocks = {'stock':row[0]}
         stock.append(stocks)
  
     return jsonify(stocks)

###############################################TOTAL D'ENTREE #######################################
@app.route('/api/countEntre')
def getCountEntre():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
    # cursor.execute('CREATE TABLE entrer(idEnt INTEGER PRIMARY KEY AUTOINCREMENT, nomMed TEXT, stockEnt INTEGER, dateEnt DATE)')
     #db.commit()
    
     cursor.execute('SELECT SUM(stockEnt) FROM entrer')
     data = cursor.fetchall()
     db.close()
     stock  = []
     for row in data:
         stocks = {'stock':row[0]}
         stock.append(stocks)
  
     return jsonify(stocks)

@app.route('/api/listeClient')
def getListeClient():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()

     cursor.execute('SELECT medicament.nomMed AS med,achat.nom,achat.nombre,achat.date FROM achat,medicament  WHERE achat.nomMed=medicament.id  limit 5')
     data = cursor.fetchall()
     db.close()
     achats  = []
     for row in data:
         achat = {'med':row[0],'nom':row[1],'nombre':row[2],'date':row[3]}
         achats.append(achat)
  
     return jsonify(achats)


##############################################  FACTURE ####################################################################

@app.route('/api/facture',methods=['POST'])
def getFacture():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()
     data = request.get_json()
     nom = data["nom"]
     date = data["date"]
     print(type(nom))
     cursor.execute("SELECT achat.date AS date,client.nomClient AS nomclient, medicament.nomMed AS nomMed,medicament.prix AS prix,achat.nombre AS nombre , (nombre*prix) AS montant FROM achat,client,medicament WHERE achat.nomMed=medicament.id AND achat.nom=client.idClient AND client.idClient=%s" % nom )
     cursor.execute("")
     donne = cursor.fetchall()
     db.close()
     factures  = []
     for row in donne:
         facture = {'date':row[0],'nomClient':row[1],'nomMed':row[2],'prix':row[3],'nombre':row[4],'montant':row[5]}
         factures.append(facture)
  
     return jsonify(factures)
  


###############################################CLIENT #######################################
@app.route('/api/client')
def getClient():
     db = sqlite3.connect('posts.db')
     cursor = db.cursor()

     cursor.execute('SELECT * FROM client')
     data = cursor.fetchall()
     db.close()
     clients  = []
     for row in data:
         client = {'idClient':row[0],'nomClient':row[1],'adresse':row[2],'genre':row[3]}
         clients.append(client)
  
     return jsonify(clients)

@app.route('/api/client',methods=['POST'])
def createclient():
    db=   sqlite3.connect('posts.db')
    cursor = db.cursor()
    data = request.get_json()
    nomClient = data["nomClient"]
    adresse = data["adresse"]
    genre = data["genre"]

    
    cursor.execute('INSERT INTO client(nomClient, adresse, genre) VALUES("%s", "%s", "%s")' % (nomClient, adresse, genre))
    db.commit()

    db.close()
    return jsonify("client a été bien enregistrer")

if __name__ =='__main__':
    app.run(debug=True, threaded=True)