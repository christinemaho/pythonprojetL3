import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiPlus, BiSolidPencil, BiSolidTrash } from "react-icons/bi";
export default function ClientPage() {
    const[client,setClient] = useState([])
    const fechClient = ()=>{
        axios
        .get("http://127.0.0.1:5000/api/client")
        .then((res) => {setClient(res.data);console.log(res.data);})
        .catch((err) => console.log(err));
    }
    useEffect(() => {
        fechClient();
      }, []);
    
  return (
    <div className="w-100 bg-red rounded p-3 top-6">
           <h2 className="text-center">LISTES DES MEDICAMENTS</h2>
     
      <div className="">
      <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link to="/ajout_client" className="btn btn-lg  btn-success ">
        + Ajouter
        </Link>
        <input
          type="text"
          placeholder="Recherche..."
          style={{ width: "350px", outline: "none" }}
        
        />
      </div>
      
      <table className="table overflow-x:auto table-borderless">
        <thead>
          <tr>
            {/* <th>numCompte</th> */}
            <th scope="col" class="px-6 py-3">
              NUMERO
            </th>
            <th scope="col" class="px-6 py-3">
              NOM
            </th>
            <th scope="col" class="px-6 py-3">
              ADRESSE
            </th>
            <th scope="col" class="px-6 py-3">
              GENRE
            </th>
            {/* <th scope="col" class="px-6 py-3">DATE</th>
                        <th scope="col" class="px-6 py-3">MONTANT à PAYER</th> */}
            <th scope="col" colspan="2" class="px-6 py-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {client.map((item, index) => {
            const { pret } = item;
            return (
              <tr key={index}>
                {/* <td>{medicament.numCompte}</td> */}
                <td scope="col" class="px-6 py-3">
                  {item.idClient}
                </td>
                <td scope="col" class="px-6 py-3">
                  {item.nomClient}
                </td>
                <td scope="col" class="px-6 py-3">
                  {item.adresse}
                </td>
                <td scope="col" class="px-6 py-3">
                  {item.genre}
                </td>
                {/* <td scope="col" class="px-6 py-3">{medicament.date}</td>
                                <td scope="col" class="px-6 py-3">{medicament.pret}</td> */}
                {/* <td scope="col" class="px-6 py-3">{pret}</td> */}
                <td scope="col" class="px-2 py-1flex">
                  {/* <Link  to={`/read/${medicament.id}`} className='btn btn-sm btn-primary'>read</Link> */}
                   <Link 
                     to={`/edit/${item.id}`} 
                     className="btn btn-lg btn-success" 
                   > 
                     <BiSolidPencil /> 
                   </Link> 
                  <button
                    className="btn btn-lg  btn-danger"
                    onClick={() => handleDelete(item.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    <BiSolidTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}
