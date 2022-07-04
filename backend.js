const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')
const app = express()
const port = 3050

app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(express.json())
app.use(cookieParser())

const db = require('./src/db_utils_vente')

// ==================== Gestion des utilisateurs ====================

/////////// Liste des users à mettre en base de données par la suite
let userList = [  {id: 1, name: 'admin', password: 'admin'},
                  {id: 2, name: 'user1', password: 'user1'},
                  {id: 3, name: 'user2', password: 'user2'} 
              ]
//////////////////////////////////////////////////////////////////////
let userData = {}

app.post('/login', (req, res) => {
  console.log(req.body)
  let userId = req.cookies.userid
  let userName = req.body.name
  let userPassword = req.body.password
  if(userId === undefined) {
    let user = userList.find(user => user.name === userName && user.password === userPassword)
    if(user === undefined) {
      res.status(401).send(error);
    }
    else {
      let newUserId = crypto.randomUUID()
      userData[newUserId] = {'panier': []}
      res.cookie('userid', newUserId, {maxAge: 900000, httpOnly: true})
      res.status(200).send(`Connection OK`)
    }
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('userid')
  res.send(`Déconnexion OK`)
})

// ==================================================================

// ======================== Gestion des produits ====================
// Liste des produits
app.get('/get-products', function requestHandler(request, response) {
  db.dbGetProducts(
    function (error, results, fields){
      if (error) {
        console.log(error)
        response.status(500).send(error)
      } else {  // Si pas d'erreur  =>  on renvoie la liste des produits
        response.json(results)
      }
   })
});

// Détail d'un produit
app.get('/get-detail-product/:productId', function requestHandler(request, response) {
  db.dbGetDetail(request.params.productId,
    function (error, results, fields){
      if (error) {
        console.log(error)
        response.status(500).send(error)
      } else {  // Si pas d'erreur  =>  on renvoie le detail du produit
        console.log(results)
        response.json(results[0])
      }
   })
});

// Ajout d'un produit à la base de données
app.post('/new-product', function requestHandler(request, response) {
  db.dbAddProduct(request.body, 
    function (error, results, fields){
      if (error) {
        console.log(error)
        response.status(500).send(error)
      } else {  
        response.json(results)
      }
   })
});

// Mise à jour d'un produit dans la base de données
app.post('/update-product/:productId',(request,response) => {
  console.log("Update : ", request.params.productId)
  console.log(request.params)
  db.dbUpdateProduct(request.body,
    function (error, results, fields){ 
      if (error) {
        console.log(error)
        response.status(500).send(error)
      } else {  
        response.json(results)
      }
  });
})

// Suppression d'un produit dans la base de données
app.delete('/delete-product/:productId',function requestHandler(request, response) {
  db.dbDeleteProduct(request.params.productId,
    function (error, results, fields){ 
      if (error) {
        console.log(error)
        response.status(500).send(error)
      } else {  
        response.json(results)
      }
   });
})

// ==================================================================


// ======================== Gestion du panier =======================

app.get('/ajouter-produit/:id', (req, res) => {
  let userId = req.cookies.userid
  let productId = req.params.id
  if(userData[userId] === undefined) {
    res.status(401).send(error);
  } else {
    userData[userId].panier.push(productId)
    res.status(200).send(`Produit ajouté au panier`)
  }
})

app.get('/panier', (req, res) => {
  let userId = req.cookies.userid
  if(userData[userId] === undefined) {
    res.status(401).send(error);
  } else {
    res.send(`
      let products={}
      ${userData[userId].panier.map(product => 
        db.dbGetDetail(product, (err, result) => {
          if(err) {
            res.status(500).send(err)
          } else {
            products[product] = result
          }
        }
      )).join('')}
      res.send(products)
    `)
  }
})

// ==================================================================

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
