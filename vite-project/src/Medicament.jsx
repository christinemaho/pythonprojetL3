
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiPlus, BiSolidPencil, BiSolidTrash } from "react-icons/bi";
import { Button, Modal } from "react-bootstrap";
// import { ToastContainer , Toast } from 'react-to'

function Medicament() {
  const [medicament, setMedicament] = useState([]); 
  const [deleteMedicament, setDeleteMedicament] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [searchMedicament, setsearchMedicament] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/medicament", {
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
  const fetchMedicament = () => {
    axios
      .get("http://127.0.0.1:5000/api/medicament")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchMedicament();
  }, []);
  /////////////////////////////////////////////******* TS ZAH  NANAO  ANIO  LAH  AZAFDY   */
  const totalty = () => {
    let totalty = 0;
    data.forEach((datas) => {
      totalty = totalty + datas.pret;
    });
    return totalty;
  };
  const handleDelete = (id) => {
    setshowModal(true);
    setDeleteMedicament(id);
  };
    ///////////////////////////////////////////SUPPRIMER MEDICAMENT /////////////////////////////////////////////////////
  const supprimerMedicament = () => {
    axios
      .delete("http://127.0.0.1:5000/api/medicament/" + deleteMedicament)
      .then((res) => {
        console.log(res.data);
        setshowModal(false);
        fetchMedicament();
      })
      .catch((err) => console.log(err));
  };
  ///////////////////////////////////////////RECHERCHE PAR MEDICAMENT /////////////////////////////////////////////////////
  const filterData = data.filter((item) =>
    item.nomMed.toLowerCase().includes(searchMedicament.toLocaleLowerCase())
  );
  // console.log('total' , totalty())
  // {data.map((item) => {
  //     const {pret} = item
  // })}

  return (
     
    <div className="w-100 bg-red rounded p-3 top-6">
           <h2 className="text-center">LISTES DES MEDICAMENTS</h2>
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>VOUS VOULEZ SUPPRIMER</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={() => setshowModal(false)}>NON</Button>
          <Button variant="danger" onClick={supprimerMedicament}>
            OUI
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="">
      <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link to="/ajouter" className="btn btn-lg  btn-success ">
        + Ajouter
        </Link>
        <input
          type="text"
          placeholder="Recherche..."
          style={{ width: "350px", outline: "none" }}
          value={searchMedicament}
          onChange={(e) => setsearchMedicament(e.target.value)}
        />
      </div>
      
      <table className="table overflow-x:auto table-borderless">
        <thead>
          <tr>
            {/* <th>numCompte</th> */}
            <th scope="col" class="px-6 py-3">
              DESIGNATION
            </th>
            <th scope="col" class="px-6 py-3">
              PRIX
            </th>
            <th scope="col" class="px-6 py-3">
              STOCK
            </th>
            
            {/* <th scope="col" class="px-6 py-3">DATE</th>
                        <th scope="col" class="px-6 py-3">MONTANT à PAYER</th> */}
            <th scope="col" colspan="2" class="px-6 py-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((medicament, index) => {
            const { pret } = medicament;
            return (
              <tr key={index}>
                {/* <td>{medicament.numCompte}</td> */}
                <td scope="col" class="px-6 py-3">
                  {medicament.nomMed}
                </td>
                <td scope="col" class="px-6 py-3">
                  {medicament.prix}
                </td>
                <td scope="col" class="px-6 py-3">
                  {medicament.stock}
                </td>
                
                {/* <td scope="col" class="px-6 py-3">{medicament.date}</td>
                                <td scope="col" class="px-6 py-3">{medicament.pret}</td> */}
                {/* <td scope="col" class="px-6 py-3">{pret}</td> */}
                <td scope="col" class="px-2 py-1flex">
                  {/* <Link  to={`/read/${medicament.id}`} className='btn btn-sm btn-primary'>read</Link> */}
                   <Link 
                     to={`/edit/${medicament.id}`} 
                     className="btn btn-lg btn-success" 
                   > 
                     <BiSolidPencil /> 
                   </Link> 
                  <button
                    className="btn btn-lg  btn-danger"
                    onClick={() => handleDelete(medicament.id)}
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
    </div>
  );
}
export default Medicament;
