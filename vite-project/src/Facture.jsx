import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from './assets/logo.png'
export default function Facture() {
    const  donne = {
        nom:"",
        date:""
    }
    const[client,setclient] = useState([])
    const[data,setData] = useState(donne)
    const fetchClient = ()=>{
        axios.get("http://127.0.0.1:5000/api/client")
        .then((res) => {
          setclient(res.data);
          console.log(res.data);
        }) 
      }
      const submitData = ()=>{
        axios.post("http://127.0.0.1:5000/api/facture",data)
        .then((res) => {
          
          console.log(res.data);
          const fac = res.data
           // Informations du tableau
           const doc = new jsPDF();
    const tableData = [
        ['Désignation', 'Prix unitaire', 'Nombre', 'Montant'], // En-tête des colonnes
        ...fac.map(item => [item.nomMed, item.prix, item.nombre, item.montant]),
        
      ];
      // Ajout du titre au PDF
    const title = 'Facture achat ';
    const titleX = doc.internal.pageSize.width / 2; // Centre de la page
    const titleY = 10; // Position Y du titre
    doc.setFontSize(16); // Taille de police pour le titre
    doc.text(title, titleX, titleY, { align: 'center' });

    // Ajout de la date en bas du titre
    const currentDate = new Date().toLocaleDateString();
    const dateX = titleX+5;
    const dateY = titleY + 15; // Position Y de la date (sous le titre)
    doc.setFontSize(12); // Taille de police pour la date
    doc.text(currentDate, dateX, dateY, { align: 'center' });
         // Ajout du logo/image au PDF
    const imgWidth = 10; // Largeur de l'image dans le PDF
    const imgHeight = 10; // Hauteur de l'image dans le PDF
    const xOffset = 2; // Position X de l'image
    const yOffset = 2; // Position Y de l'image
    doc.addImage(logo, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
   // Calcul du nouveau total (somme des montants)
   const newTotal = tableData.slice(1).reduce((total, row) => total + parseFloat(row[3]), 0);
      // Position de départ pour le tableau
      let startY = 20
       // Ajout du tableau au PDF
    doc.autoTable({
        head: tableData.slice(0, 1), // En-tête du tableau
        body: tableData.slice(1),    // Corps du tableau
        startY: startY,              // Position Y de départ
      });
     // Ajout du nouveau total au bas du tableau
    const totalX = doc.internal.pageSize.width - 10; // Position X du total
    const totalY = startY + doc.autoTable.previous.finalY + 5; // Position Y du total
    doc.text(`Total: ${newTotal.toFixed(2)} ARIARY`, totalX, totalY, { align: 'right' });
     
        doc.save('test.pdf');

        }) 
        
      }
      useEffect(()=>(
        fetchClient()
      ),[])
      
  return (
    <>
    <h1 className='text-center'>Facture</h1>
    <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
            <form action="">
                <div className="form-group">
                    <select name="" id="" className='form-control' onChange={(e)=>setData({...data,nom:e.target.value})}>
                        <option value="">Selectionnez client</option>
                        {
                            client.map((item,index)=>(
                                <option value={item.idClient} key={index}>{item.nomClient}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mt-3">
                    <input type="date" name="" id="" className='form-control' onChange={(e)=>setData({...data,date:e.target.value})}/>
                </div>
                <button type="button" className='btn btn-primary mt-3' onClick={submitData}>Facturer</button>
            </form>
        </div>
        <div className="col-4"></div>
    </div>
    
    </>
  )
}
