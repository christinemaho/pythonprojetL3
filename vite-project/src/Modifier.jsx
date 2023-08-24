import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Modifier() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          nom: res.data[0].nom,
          prenom: res.data[0].prenom,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    nomMed: "",
    prix: "",
    stock: "",
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/medicament");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-100 rounded p-3">
      <form onSubmit={handleUpdate}>
        <div className="input-control">
          <label htmlFor="">nomMed</label>
          <input
            className="form-control"
            type="text"
            placeholder="entrez votre"
            value={values.nomMed}
            onChange={(e) => setValues({ ...values, nomMed: e.target.value })}
          />
        </div>
        <div className="input-control">
          <label htmlFor="">prix</label>
          <input
            className="form-control"
            type="number"
            placeholder="entrez votre"
            value={values.prix}
            onChange={(e) => setValues({ ...values, prix: e.target.value })}
          />
        </div>
        <div className="input-control">
          <label htmlFor="">stock</label>
          <input
            className="form-control"
            type="number"
            placeholder="entrez votre"
            value={values.stock}
            onChange={(e) => setValues({ ...values, stock: e.target.value })}
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
  );
}

export default Modifier;
