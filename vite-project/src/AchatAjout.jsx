import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AchatAjout() {
  const [values, setValues] = useState({
    nomMed: 0,
    nom: "",
    nombre: "",
    date: "",
  });

  const [listMed, setListMed] = useState([]);
  const [client,setClient] = useState([])
  const [flag,setFlag] = useState(false)
  const fechMed = () => {
    axios
      .get("http://127.0.0.1:5000/api/medicament")
      .then((res) => setListMed(res.data))
      .catch((err) => console.log(err));
  };
  const fetchClient = () => {
    axios
      .get("http://127.0.0.1:5000/api/client")
      .then((res) => setClient(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fechMed();
    fetchClient()
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/api/achat", values)
      .then((res) => {
        if (res.data.status == 1) {
            setFlag(true)
        } else {
          navigate("/achat");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-100 rounded p-3">
      {flag ? <p className="alert alert-danger">Stock insuffisant</p> : ""}
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
        <form onSubmit={handleSubmit}>
        <div className="input-control">
          <div className="input-control">
            <label htmlFor="">Medicament</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={(e) => {
                setValues({ ...values, nomMed: e.target.value });
              }}
            >
              <option value="">Selectionnez le medicament</option>
              {listMed.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.nomMed}
                </option>
              ))}
            </select>
          </div>
          <div className="input-control mt-2">
            <label htmlFor="">Nom du client </label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={(e) => {
                setValues({ ...values, nom: e.target.value });
              }}
            >
              <option value="">Selectionnez le nom  du  client </option>
              {client.map((item, index) => (
                <option key={index} value={item.idClient}>
                  {item.nomClient}
                </option>
              ))}
            </select>
          </div>
          <div className="input-control mt-2">
            <label htmlFor="">Quantite</label>
            <input
              className="form-control"
              required
              type="number"
              placeholder="entrez votre"
              onChange={(e) => setValues({ ...values, nombre: e.target.value })}
            />
          </div>
          <div className="input-control mt-2">
            <label htmlFor="">Date d'achat</label>
            <input
              className="form-control"
              required
              type="date"
              placeholder="entrez votre"
              onChange={(e) => setValues({ ...values, date: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-2">
        <button type="submit" className="btn btn-sm btn-primary">
          enregistrer
        </button>{" "}
        
        <Link to={"/achat"} className="btn btn-sm btn-danger">
          annuler
        </Link>
        </div>
      </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
export default AchatAjout;
