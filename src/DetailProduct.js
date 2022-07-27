import {useState, useEffect} from 'react';
import Bouton from './Bouton';


function ViewDetail(props){

  let [produit, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3050/get-detail-product/${props.idProduct}`, {
      method: 'get',
      credentials: 'include'})
      .then(response => response.json())  // Convertit le json en objet
      .then(jsonBackendData => { // jsonBackendData est un tableau d'objets
        setProduct(jsonBackendData); // On met à jour le state
        console.log(jsonBackendData);
      })
      .catch(error => { // Si erreur
        console.log('Erreur : ' + error); // On affiche l'erreur
      });
  }, [props.idProduct]);
  
  let detailCss = `bg-light border border-dark m-2 p-2 rounded text-left text-black height:100vh`;

  return (
    <div className={detailCss}>
      <div>
                <h4>{produit.nom}</h4>
                <p>Description : {produit.description}</p>
                <p>Prix : {produit.prix} €</p>
                <img src={produit.url} alt={produit.nom} />
      </div>
      <div className="m-2 p-2">
          {props.login === 'admin' && (<Bouton typeBtn="btn btn-warning" click={props.handleModify()}>Modifier</Bouton>)}
          {props.login === 'admin' && (<Bouton typeBtn="btn btn-danger" click={()=>props.handleDelete()}>Supprimer</Bouton>)}
        </div>
      </div>
    );

}

function DeleteProduct(props){
  fetch(`http://localhost:3050/delete-product/${props.idProduct}`, {
    method: 'delete',
    credentials: 'include'})
    .then(response => response.json())  // Convertit le json en objet
    .then(jsonBackendData => { // jsonBackendData est un tableau d'objets
      props.setProducts([]); // On met à jour le state
      console.log(jsonBackendData);
    })
    .catch(error => { // Si erreur
      console.log('Erreur : ' + error); // On affiche l'erreur
    });
}


function DetailProduct(props) {
  
  function handleModify(){
    props.setAffiche("")
  }

  function handleDelete(){
    DeleteProduct(props);
    props.setIdProduct(0);
    props.setAffiche('ProductList');
  }

  return (
    <div>
      <ViewDetail setProducts={props.setProducts} idProduct={props.idProduct} login={props.login} handleModify={handleModify} handleDelete={handleDelete}/>
    </div>
  );

}

export default DetailProduct;
