import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function AchatModifier() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/achat/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          nomMed: res.data[0].nomMed,
          nom: res.data[0].nom,
          nombre: res.data[0].nombre,
          date: res.data[0].date,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const [values, setValues] = useState({
    nomMed: "",
    nom: "",
    nombre: "",
    date: "",
  });
  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://127.0.0.1:5000/api/achat/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/achat");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-100 rounded p-3">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <form onSubmit={handleUpdate}>
            <div className="input-control">
              <label htmlFor="">NOM DU MEDICAMENT</label>
              <input
                className="form-control"
                type="text"
                placeholder="entrez votre"
                value={values.nomMed}
                onChange={(e) =>
                  setValues({ ...values, nomMed: e.target.value })
                }
              />
            </div>
            <div className="input-control">
              <label htmlFor="">NOM DU CLIENT</label>
              <input
                className="form-control"
                type="text"
                placeholder="entrez votre"
                value={values.nom}
                onChange={(e) => setValues({ ...values, nom: e.target.value })}
              />
            </div>
            <div className="input-control">
              <label htmlFor="">QUANTITER</label>
              <input
                className="form-control"
                type="number"
                placeholder="entrez votre"
                value={values.nombre}
                onChange={(e) =>
                  setValues({ ...values, nombre: e.target.value })
                }
              />
            </div>
            <div className="input-control">
              <label htmlFor="">DATE</label>
              <input
                className="form-control"
                type="date"
                placeholder="entrez votre"
                value={values.date}
                onChange={(e) => setValues({ ...values, date: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-sm btn-primary">
              {" "}
              modifier
            </button>
            <br />
            <Link to={"/achat"} className="btn btn-sm btn-danger">
              {" "}
              annuler
            </Link>
          </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
    // <div className='input-control'>coucou</div>
  );
}

export default AchatModifier;
