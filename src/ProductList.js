import background from "./img/rayon.png";
import classes from './ProductList.module.css';
import Bouton from './Bouton';
import DetailProduct from './DetailProduct';
import {useState, useEffect} from 'react';
// import NumberPicker from 'react-number-picker';
import AddProduct from "./AddProduct";

function ProductView(props) {
  let monCss = `${classes.policeTitre} bg-light border border-dark m-2 p-2 rounded text-left text-black`;

  return (
     <div className={monCss}>
      <table>
        <tbody>
          <tr>
            <td width={100}>
              <a href="#top" onClick={()=>{props.setIdProduct(props.id); props.setAffiche('DetailProduct')}} >
                {props.name}
              </a>
            </td>
            <td width={300} align={'left'}> {props.description} </td>
            <td width={50} align={'center'}> {props.price} € </td>
            <td> <img src={props.url} alt={props.name} width="50"/> </td>
            <td width={50} align={'center'}>{props.quantite}</td>
            {/* <td width={50} align={'center'}> <NumberPicker value={props.quantite} /> </td> */}
            <td>
              <Bouton typeBtn="btn btn-primary" click={()=>{console.log('achat')}}><img src="img/acheter.png" alt="Acheter" width="20"/></Bouton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ProductList(props) {
  
  let [produits, setProducts] = useState([]);
  let [affiche, setAffiche] = useState('ProductList');
  let [idProduct, setIdProduct] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3050/get-products', {
      method: 'get',
      credentials: 'include'})
      .then(response => response.json())  // Convertit le json en objet
      .then(jsonBackendData => { // jsonBackendData est un tableau d'objets
        setProducts(jsonBackendData); // On met à jour le state
      })
      .catch(error => { // Si erreur
        console.log('Erreur : ' + error); // On affiche l'erreur
      });
  }, [produits]);

  function handleClick() {
    setIdProduct(0);
    setAffiche('ProductList');
  }

  let monCss = { backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", height: "100vh"};
  return (

    <div style={monCss}>
      <div>
        <Bouton typeBtn="btn btn-primary" click={() => props.setCurrentPage('Contact')}>Contactez-nous</Bouton>
      </div>
      <div className="container" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <div className = "row col-9 col-sm-7 offset-md-5">
          <div>
            {produits.map(product => 
              <ProductView
                key={product.idProduit}
                id={product.idProduit}
                name={product.nom}
                description={product.description}
                price={product.prix}
                url={product.url}
                quantite={0}
                setIdProduct={setIdProduct}  
                setAffiche={setAffiche}
              />
            )}  
          </div>
          {props.login==='admin' && <Bouton typeBtn="btn btn-success m-2 p-2" click={() => setAffiche('AddProduct')}>Ajouter un nouveau produit au magasin</Bouton>}
        </div>
        <div className="row col-3 d-none d-sm-block">
          <div>
            {affiche === 'DetailProduct' && <DetailProduct setProducts={setProducts} idProduct={idProduct} setAffiche={setAffiche} login={props.login} />}
            {affiche === 'AddProduct' && <AddProduct setAffiche={setAffiche} setIdProduct={setIdProduct}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;