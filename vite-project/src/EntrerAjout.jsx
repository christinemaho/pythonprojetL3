import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function EntrerAjout() {
  const [values, setValues] = useState({
    nomMed: 0,
    stockEnt: "",
    dateEnt: "",
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
      .post("http://127.0.0.1:5000/api/entrer", values)
      .then((res) => {
        console.log(res);
        navigate("/entrer");
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
            <label htmlFor="">NOM DU MEDICAMENT</label>
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
          <div className="input-control">
            <label htmlFor="">QUANTITER</label>
            <input
              className="form-control"
              required
              type="number"
              placeholder="entrez votre"
              onChange={(e) =>
                setValues({ ...values, stockEnt: e.target.value })
              }
            />
          </div>

          <div className="input-control">
            <label htmlFor="">DATE</label>
            <input
              className="form-control"
              required
              type="date"
              placeholder="entrez votre"
              onChange={(e) =>
                setValues({ ...values, dateEnt: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit" className="btn btn-sm btn-primary">
          enregistrer
        </button>{" "}
       
        <Link to={"/entrer"} className="btn btn-sm btn-danger">
          annuler
        </Link>
      </form>
      </div>
      <div className="col-4"></div>
     </div>
    </div>
  );
}
export default EntrerAjout;
