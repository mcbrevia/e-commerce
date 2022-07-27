import {useState} from 'react';
import Welcome from './Welcome'
import Login from './Login';
import ProductList from './ProductList.js';
import Panier from './Panier.js';
import Paiement from './Paiement.js';
import FicheContact from './FicheContact.js';


function App(props) {

  let [currentPage, setCurrentPage] = useState("Welcome");
  let contact = { name: "Jean", tel: "06-12-34-56-78", email: "Jean@shoponline.fr" };
  let [login, setLogin] = useState("");

  return (
    <div>
      {currentPage === 'Welcome' && <Welcome setCurrentPage={setCurrentPage}/>}
      {currentPage === 'Login' && <Login setCurrentPage={setCurrentPage} setLogin={setLogin}/>}
      {currentPage === 'ProductList' && <ProductList setCurrentPage={setCurrentPage} login={login}/>}
      {currentPage === 'Panier' && <Panier setCurrentPage={setCurrentPage} login={login} />}
      {currentPage === 'Paiement' && <Paiement setCurrentPage={setCurrentPage}/>}
      {currentPage === 'Contact' && <FicheContact {...contact} setCurrentPage={setCurrentPage}/>}
    </div>
  );

}

export default App;
