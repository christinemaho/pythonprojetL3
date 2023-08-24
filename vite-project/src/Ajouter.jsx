import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ajouter() {
    const [values, setValues] = useState({
        nomMed: '',
        prix : '',
        stock: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/api/medicament', values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err));
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">NOM</label>
                    <input type="text" placeholder='entrez votre' onChange={e => setValues({...values, nomMed: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="">PRENOM</label>
                    <input type="text" placeholder='entrez votre' onChange={e => setValues({...values, prix: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="">PRENOM</label>
                    <input type="text" placeholder='entrez votre' onChange={e => setValues({...values, stock: e.target.value})} />
                </div>
                <button type="submit">enregistrer</button>
            </form>
        </div>
    )
    
}
export default Ajouter
