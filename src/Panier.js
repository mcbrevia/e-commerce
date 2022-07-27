import {useState, useEffect} from 'react';

function ViewPanier(props) {

    let [panier, setPanier] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3050/get-panier', {
            method: 'get',
            credentials: 'include'})
            .then(response => response.json())  // Convertit le json en objet
            .then(jsonBackendData => { // jsonBackendData est un tableau d'objets
                setPanier(jsonBackendData); // On met à jour le state
                console.log(jsonBackendData);
            })
            .catch(error => { // Si erreur
                console.log('Erreur : ' + error); // On affiche l'erreur
            });
    }, []);

    let totalPanier = 0;
    let totalPrix = 0;

    return (
        <div className="bg-light border border-dark m-2 p-2 rounded text-left text-black height:100vh">
            <div>
                <h4>Panier</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {panier.map(produit => (
                            totalPrix = produit.prix * produit.quantite,
                            totalPanier += totalPrix,
                            <tr key={produit.id}>
                                <td>{produit.nom}</td>
                                <td>{produit.description}</td>
                                <td>{produit.prix}</td>
                                <td>{produit.quantite}</td>
                                <td>{totalPrix}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Total : </td>
                            <td>{totalPanier}</td>
                        </tr>
                    </tbody>
                </table>
                <a href='#' 
                    onClick={() => props.setCurrentPage('ProductList')} className="Tab">
                    Revenir à la liste des produits
                </a>
                <br/>
                <a href='#' 
                    onClick={() => props.setCurrentPage('Paiement')} className="Tab">
                    Valider la commande
                </a>
            </div>
        </div>
    );
}

function Panier(props) {
    
    return (
        <div>
            <ViewPanier setCurrentPage={props.setCurrentPage} login={props.login}/>
        </div>
    );
    
}

export default Panier;