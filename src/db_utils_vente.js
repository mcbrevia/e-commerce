var mysql  = require('mysql');

 /**************************************************************
  * Fonction interne utilisée par les autre fonctions pour la 
  * création de la connection à la base mySQL taskdb
  **************************************************************/
function connectToMySQL(){
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'vente'
  });
  
  connection.connect();

  return connection
}

 /**************************************************************
  * Fonction pour la récupération de la liste des produits 
  * stockés en base
  **************************************************************/
function dbGetProducts(doAtEnd){

  // Connexion à la base de données
  let connection = connectToMySQL()

  let sql = "select * from produit order by idProduit asc"

  // Récupération des données en base
  connection.query(sql, doAtEnd)

  // Fermeture de la transaction
  connection.end()

}

 /**************************************************************
  * Fonction pour la récupération d'un produit stocké en base
  **************************************************************/
  function dbGetDetail(productId, doAtEnd){

    // Connexion à la base de données
    let connection = connectToMySQL()
  
    let sql = `select * from produit where idProduit = ?`
    let value_to_select = [productId]

    // Récupération des données en base
    connection.query(sql, value_to_select, doAtEnd)
  
    // Fermeture de la transaction
    connection.end()
  
  }

 /**************************************************************
  * Fonction pour insérer en base un nouveau produit
  **************************************************************/
function dbAddProduct(pbody, doAtEnd){

  // Préparation de la reqête SQL en fonction des données saisies dans le formulaire
  let connection = connectToMySQL()
  let sql = `insert into produit (nom, description, prix, url) values (?, ?, ?, ?)`
  let values_to_insert = [pbody['name'], pbody['description'], parseInt(pbody['price']), pbody['url']]

  // Connexion à la base de données
  connection.query(sql, values_to_insert, doAtEnd)

  // Commit et fermeture de la transaction
  connection.commit()
  connection.end()

}

 /**************************************************************
  * Fonction pour mettre à jour le statut et la date de fin 
  * d'une tâche dans la base de donnée
  **************************************************************/
  function dbUpdateProduct(pbody, doAtEnd){

  // Préparation de la requête SQL
  let sql = `update produit set nom = ?, description = ?, prix = ?, url = ? where idProduit = ?`
  let values_to_update = [pbody['name'], pbody['description'], parseInt(pbody['price']), pbody['url'], parseInt([pbody['id']])]
  
  // Connexion à la base
  let connection = connectToMySQL()

  // Passage de la requête de mise à jour
  connection.query(sql, values_to_update, doAtEnd)

  // Commit et fermeture de la transaction
  connection.commit()
  connection.end()

}

 /**************************************************************
  * Fonction pour supprimer de la base un Produit
  **************************************************************/
 function dbDeleteProduct(productId, doAtEnd){

  // Préparation de la requête SQL
  let values_to_delete = parseInt([productId])
  let sql = `delete from produit where idProduit = ?`
  
  console.log(sql, values_to_delete)
  
  // Connexion à la base
  let connection = connectToMySQL()

  // Passage de la requête de suppression
  connection.query(sql, values_to_delete, doAtEnd)

  // Commit et fermeture de la transaction
  connection.commit()
  connection.end()

}

 /**************************************************************
  * Fonctions exportées pour manipulation de la base de données
  **************************************************************/
  module.exports = {
    dbGetProducts: dbGetProducts, 
    dbGetDetail: dbGetDetail, 
    dbAddProduct: dbAddProduct, 
    dbUpdateProduct: dbUpdateProduct,
    dbDeleteProduct: dbDeleteProduct,
}