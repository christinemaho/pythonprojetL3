import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Uptade() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/medicament/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          nomMed: res.data[0].nomMed,
          prix: res.data[0].prix,
          stock: res.data[0].stock,
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
      .put("http://127.0.0.1:5000/api/medicament/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
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
              <label htmlFor="">numMed</label>
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
                onChange={(e) =>
                  setValues({ ...values, stock: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-sm btn-primary">
              {" "}
              modifier
            </button>
            <br />
            <Link to={"/medicament"} className="btn btn-sm btn-danger">
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

export default Uptade;
