import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  BiHome,
  BiSolidCapsule,
  BiSolidCartAdd,
  BiSolidChevronRightCircle,
  BiSolidDashboard,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import ChartComponent from "./component/ChartComponent ";
function Acceuil() {
  const [countMed, setCountMed] = useState(0);
  const [countAchat, setCountAchat] = useState(0);
  const [countEntre, setCountEntre] = useState(0);
  const[data,setData] = useState([])
  const fetchMedicament = () => {
    axios
      .get("http://127.0.0.1:5000/api/countMedicament")
      .then((res) => {setCountMed(res.data.stock);console.log(res.data.stock);})
      .catch((err) => console.log(err));
  };
  const fetchAchat = () => {
    axios
      .get("http://127.0.0.1:5000/api/countAchat")
      .then((res) => {setCountAchat(res.data.stock);console.log(res.data.stock);})
      .catch((err) => console.log(err));
  };
  const fetchEntre = () => {
    axios
      .get("http://127.0.0.1:5000/api/countEntre")
      .then((res) => {setCountEntre(res.data.stock);console.log(res.data.stock);})
      .catch((err) => console.log(err));
  };
  const fetchdata = () => {
    axios
      .get("http://127.0.0.1:5000/api/listeClient")
      .then((res) => {setData(res.data);console.log(res.data);})
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchMedicament();
    fetchAchat();
    fetchEntre()
    fetchdata()
  }, []);
  
  return (
    <>
      <div className="row">
        <div className="col-4 ">
          <div className="card shadow p-3 mb-3 bg-body  rounded">
            <div className="card-body">
              <h4 className="text-center">Total Medicament</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BiSolidCapsule style={{ fontSize: "5.5rem" }} />
                <h5 style={{ fontSize: "35px" }}>{countMed}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card shadow p-3 mb-3 bg-body  rounded">
            <div className="card-body">
              <h4 className="text-center">Total d'Achat</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BiSolidCartAdd style={{ fontSize: "5.5rem" }} />
                <h5 style={{ fontSize: "35px" }}>{countAchat}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card shadow p-3 mb-3 bg-body  rounded">
            <div className="card-body">
              <h4 className="text-center">Total d'Entrée</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BiSolidChevronRightCircle style={{ fontSize: "5.5rem" }} />
                <h5 style={{ fontSize: "35px" }}>{countEntre}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-6 shadow p-3 mb-3 bg-body  rounded">
          <h5>Medicament chart</h5>
          <ChartComponent/>
        </div>
        <div className="col-6 shadow p-3 mb-3 bg-body  rounded">
          <h5>Liste du 5 derniers clients</h5>
          <table className="table table-borderless">
            <thead>
              <th>Nom du client </th>
              <th>Medicament </th>
              <th>Quantité </th>
              <th>Date </th>
            </thead>
            <tbody>
              {
                data.map((item,index)=>(
                  <tr key={index}>
                    <td>{item.nom}</td>
                    <td>{item.med}</td>
                    <td>{item.nombre}</td>
                    <td>{item.date}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Acceuil;
