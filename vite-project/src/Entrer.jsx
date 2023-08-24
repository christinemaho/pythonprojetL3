import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiPlus, BiSolidPencil, BiSolidTrash } from "react-icons/bi";
import { Button, Modal } from "react-bootstrap";
// import { ToastContainer , Toast } from 'react-to'

function Entrer() {
  const [entrer, setEntrer] = useState([]);
  const [deleteEntrer, setDeleteEntrer] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [searchEntrer, setsearchEntrer] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/entrer", {
      methods: "GET",
      headers: {
        "content-type": "applications/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  });

  const [data, setData] = useState([]);
  // const {totalty} = useGlobalContext();
  const fecthEntrer = () => {
    axios
      .get("http://127.0.0.1:5000/api/entrer")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fecthEntrer();
  }, []);
  const totalty = () => {
    let totalty = 0;
    data.forEach((datas) => {
      totalty = totalty + datas.pret;
    });
    return totalty;
  };

  const handleDelete = (id) => {
    setshowModal(true);
    setDeleteEntrer(id);
  };
  const supprimerEntrer = () => {
    axios
      .delete("http://127.0.0.1:5000/api/entrer/" + deleteEntrer)
      .then((res) => {
        console.log(res.data);
        setshowModal(false);
        fecthEntrer();
      })
      .catch((err) => console.log(err));
  };

  const filterData = data.filter((item) =>
    item.nomMed.toLowerCase().includes(searchEntrer.toLocaleLowerCase())
  );

  // console.log('total' , totalty())
  // {data.map((item) => {
  //     const {pret} = item
  // })}

  return (
    <div className="w-100 bg-red rounded p-3 top-6">
       <h2 className="text-center">LISTES DES MEDICAMENTS ENTRER</h2>
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>VOUS VOULEZ SUPPRIMER</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={() => setshowModal(false)}>NON</Button>
          <Button variant="danger" onClick={supprimerEntrer}>
            OUI
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link to="/entrer/ajouter" className="btn btn-lg btn-success ">
         + Ajouter
        </Link>
        <input
          type="text"
          placeholder="Recherche..."
          style={{ width: "350px", outline: "none" }}
          value={searchEntrer}
          onChange={(e) => setsearchEntrer(e.target.value)}
        />
      </div>
      <table className="table overflow-x:auto table-borderless">
        <thead >
          <tr>
            {/* <th>numCompte</th> */}
            {/* <th scope="col" class="px-6 py-3">
            ID
          </th> */}
            <th scope="col" class="px-6 py-3">
              NOM DU MEDICAMENT
            </th>
            <th scope="col" class="px-6 py-3">
              QUANTITER
            </th>
            <th scope="col" class="px-6 py-3">
              DATE
            </th>
            {/* <th scope="col" class="px-6 py-3">DATE</th>
                      <th scope="col" class="px-6 py-3">MONTANT à PAYER</th> */}
            <th scope="col" colspan="2" class="px-6 py-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((entrer, index) => {
            const { pret } = entrer;
            return (
              <tr key={index}>
                {/* <td>{achat.numCompte}</td> */}
                {/*    */}
                <td scope="col" class="px-6 py-3">
                  {entrer.nomMed}
                </td>
                <td scope="col" class="px-6 py-3">
                  {entrer.stockEnt}
                </td>
                <td scope="col" class="px-6 py-3">
                  {entrer.dateEnt}
                </td>
                {/* <td scope="col" class="px-6 py-3">{achat.date}</td>
                              <td scope="col" class="px-6 py-3">{achat.pret}</td> */}
                {/* <td scope="col" class="px-6 py-3">{pret}</td> */}
                <td scope="col" class="px-2 py-1flex">
                  {/* <Link  to={`/read/${achat.id}`} className='btn btn-sm btn-primary'>read</Link> */}
                  <Link
                    to={`/entrer/edit/${entrer.idEnt}`}
                    className="btn btn-lg btn-success"
                  >
                    <BiSolidPencil />
                  </Link>
                  <button
                    className="btn btn-lg btn-danger"
                    onClick={() => handleDelete(entrer.idEnt)}
                    style={{ marginLeft: "10px" }}
                  >
                    <BiSolidTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Entrer;
