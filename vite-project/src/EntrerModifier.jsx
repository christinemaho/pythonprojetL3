import  React ,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'


function EntrerModifier() {

    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(()=> {
        axios.get('http://127.0.0.1:5000/api/entrer/'+id)
        .then(res => {
            console.log(res)
            setValues({...values, nomMed: res.data[0].nomMed ,stockEnt: res.data[0].stockEnt ,dateEnt: res.data[0].dateEnt})
        })
        .catch(err => console.log(err));
    }, [])
    const [values, setValues] = useState({
        nomMed: '',
        stockEnt: '',
        dateEnt: ''
    })
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://127.0.0.1:5000/api/entrer/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/entrer')
        }).catch(err => console.log(err));
    }
    return (
        <div className='w-100 rounded p-3'> 
           <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
            <form onSubmit={handleUpdate}>
            
            <div className='input-control'>
                <label htmlFor="">NOM DU MEDICAMENT</label>
                <input className='form-control' type="text" placeholder='entrez votre' value={values.nomMed} 
                onChange={e => setValues({...values, nomMed: e.target.value})} />
            </div>
            <div className='input-control'>
                <label htmlFor="">QUANTITER</label>
                <input className='form-control' type="number" placeholder='entrez votre' value={values.stockEnt} 
                onChange={e => setValues({...values, stockEnt: e.target.value})} />
            </div>
            <div className='input-control'>

            <label htmlFor="">DATE</label>
            <input className='form-control' type="date" placeholder='entrez votre' value={values.dateEnt} 
            onChange={e => setValues({...values, dateEnt: e.target.value})} />
            </div>
        
           
            <button type="submit" className='btn btn-sm btn-primary'> modifier</button><br />
            <Link to={'/entrer'} className='btn btn-sm btn-danger'> annuler</Link>
        </form>
            </div>
            <div className="col-4"></div>
           </div>
        </div>
        // <div className='input-control'>coucou</div>
    )   
} 

export default EntrerModifier