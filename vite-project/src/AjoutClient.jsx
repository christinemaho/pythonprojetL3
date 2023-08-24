import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AjoutClient() {
    const [values, setValues] = useState({
        nomClient: "",
        genre: "Femme",
        adresse: "",
      });
    
      const [listMed, setListMed] = useState([]);
      const fechMed = () => {
        axios
          .get("http://127.0.0.1:5000/api/medicament")
          .then((res) => setListMed(res.data))
          .catch((err) => console.log(err));
      };
      useEffect(() => {
        fechMed();
      }, []);
    
      const navigate = useNavigate();
      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://127.0.0.1:5000/api/client", values)
          .then((res) => {
            console.log(res);
            navigate("/client");
          })
          .catch((err) => console.log(err));
      };
  return (
    <div className="w-100 rounded p-3">
     <div className="row">
      <div className="col-4"></div>
      <div className="col-4">
      <form onSubmit={handleSubmit}>
        <div className="input-control">
        <div className="input-control">
            <label htmlFor="">NOM  CLIENT </label>
            <input
              className="form-control"
              required
              type="text"
              placeholder="entrez le nom  client "
              onChange={(e) =>
                setValues({ ...values, nomClient: e.target.value })
              }
            />
          </div>

          <div className="input-control">
            <label htmlFor="">GENRE</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={(e) => {
                setValues({ ...values, genre: e.target.value });
              }}
            >
              <option value="Femme">Femme</option>
              <option value="Homme">Home</option>
           
            </select>
          </div>

          <div className="input-control">
            <label htmlFor="">ADRESSE</label>
            <input
              className="form-control"
              required
              type="text"
              placeholder="entrez votre"
              onChange={(e) =>
                setValues({ ...values, adresse: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit" className="btn btn-sm btn-primary mt-3">
          enregistrer
        </button>{" "}
       
        <Link to={"/entrer"} className="btn btn-sm btn-danger mt-3">
          annuler
        </Link>
      </form>
      </div>
      <div className="col-4"></div>
     </div>
    </div>
  )
}
