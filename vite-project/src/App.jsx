import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Medicament from "./Medicament";
import Acceuil from "./Acceuil";
import Create from "./Create";
import Uptade from "./Update";
import Read from "./Read";
import Achat from "./Achat";
import AchatAjout from "./AchatAjout";
import AchatModifier from "./AchatModifier";
import Entrer from "./Entrer";
import EntrerAjout from "./EntrerAjout";
import EntrerModifier from "./EntrerModifier";
import Navbar from "./Navbar";
import logo from './assets/logo.png'

import {
  BiHome,
  BiSolidCapsule,
  BiSolidCartAdd,
  BiSolidChevronRightCircle,
  BiSolidDashboard,
  BiUser,
} from "react-icons/bi";
import Facture from "./Facture";
import ClientPage from "./ClientPage";
import AjoutClient from "./AjoutClient";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="sidenav">
        
          <img src={logo} alt="" />
        
        <a>
          <BiSolidDashboard className="text-success" />
          <Link to="/">Dasboard</Link>
        </a>
        <a>
          <BiSolidCapsule className="text-success" />
          <Link to="/medicament">Medicament</Link>
        </a>
        <a>
          <BiSolidCartAdd className="text-success" />
          <Link to="/achat">Achat</Link>
        </a>
        <a>
          <BiSolidChevronRightCircle className="text-success" />
          <Link to="/entrer"> Entrer</Link>
        </a>
        <a>
          <BiUser className="text-success" />
          <Link to="/client">Client</Link>
        </a>
      </div>

      <div className="main">
        <Navbar />
        <div
          style={{
            marginTop: "105px",
          }}
          className="p-3"
        >
          <Routes>
            <Route path="/medicament" element={<Medicament />} />
            <Route path="/" element={<Acceuil />} />
            <Route path="/achat" element={<Achat />} />
            <Route path="/entrer" element={<Entrer />} />
            <Route path="/ajouter" element={<Create />} />
            <Route path="/achat/ajouter" element={<AchatAjout />} />
            <Route path="/entrer/ajouter" element={<EntrerAjout />} />
            <Route path="/read/:id" element={<Read />} />
            <Route path="/edit/:id" element={<Uptade />} />
            <Route path="/achat/edit/:id" element={<AchatModifier />} />
            <Route path="/entrer/edit/:id" element={<EntrerModifier />} />
            <Route path="/facture" element={<Facture/>}/>
            <Route path="/client" element={<ClientPage/>}/>
            <Route path="/ajout_client" element={<AjoutClient/>}/>
            {/* <Route path="/ajouter" element={<ajouter/>}/> */}
            <Route path="/achat/facture" element={<Facture/>}/>
          </Routes>
            
        </div>
      </div>
    </>
  );
}

export default App;
