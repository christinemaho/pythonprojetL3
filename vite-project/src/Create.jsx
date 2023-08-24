import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Create() {
    const [values, setValues] = useState({
        nomMed: '',
        prix: '',
        stock: 0
    })
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/api/medicament', values)
        .then(res => {
            console.log(res);
            navigate('/medicament')
        })
        .catch(err => console.log(err));
    }
    return (
        <div  className='w-100 rounded p-3'>
        <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
        <form onSubmit={handleSubmit}>
              <div className='input-control' >
              <div className='input-control mt-3'>
                    <label htmlFor="" className='mb-3'>DESIGNATION</label>
                    <input className='form-control'  required type="text" placeholder='entrez votre' 
                    onChange={e => setValues({...values, nomMed: e.target.value})} />
                </div>
                <div className='input-control mt-3'>
                    <label htmlFor="" className='mb-3'>PRIX</label>
                    <input className='form-control'  required type="number" placeholder='entrez votre' onChange={e => setValues({...values, prix: e.target.value})} />
                </div>
              

              </div>
                
                <button type="submit" className='btn btn-sm btn-primary mt-3'>enregistrer</button> 
                <Link to={'/'} className='btn btn-sm btn-danger mt-3'>annuler</Link>
            </form> 
        </div>
        <div className="col-4"></div>

        </div>
        </div>
    )   
}
export default Create
