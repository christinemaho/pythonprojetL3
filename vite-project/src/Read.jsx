import  React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


function Read() {
    const {id} = useParams();
    const [prebancaire, setPrebancaire] = useState([])
    useEffect(()=>{ 
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
            console.log(res)
            setPrebancaire(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [])
    return ( 
        <div>
            <div>
            <h3>prebancaire</h3>
            <h3>{prebancaire.id}</h3>
            <h3>{prebancaire.nomClient}</h3>
            <h3>{prebancaire.nomBanque}</h3>
            <h3>{prebancaire.montant}</h3>
            <h3>{prebancaire.date}</h3>
            <h3>{prebancaire.tautPret}</h3>
            </div>
            <Link to={'/'} className='btn btn-sm btn-info'>back</Link>
            <Link to={`/edit/${prebancaire.id}`} className='btn btn-sm btn-primary'>edit</Link>
        </div>  
    )   
} 


export default Read