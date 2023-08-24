import  React, { useEffect, useState } from 'react'
import './Navbar.css'
function Navbar() {
  const [medicament, setMedicament] = useState([])

   
    return ( 
  <nav style={{
    position: 'fixed',
    width: "100%",
    top: '0',
    left: '0',
    
    
    
  }} className=' p-3 mb-3 bg-success  rounded'>
        <ul className='liste'>
            <h3 className='items'>GESTION PHARMACIE </h3>
        </ul>
  </nav>  
    )   
} 


export default Navbar