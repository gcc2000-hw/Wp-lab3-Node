const express = require('express');
const productController = require('../controllers/productController');
const ProductService = require('../services/productServices');
const clientController = require('../controllers/clientController');
const clientService = require('../services/clientServices');
//define a router and create routes
const router = express.Router();

//routes for dynamic processing of products
//-----------------------------------------------
router.get('/api/article/:id', (req, res) => {
    console.log(req.params.id)
    console.log("HERE")
    ProductService.searchIDService(req.params.id, function(err, rows) {
        res.render('article', { product: rows });

    });
});
router.get('/api/client/:name', (req, res) => {
    console.log(req.params.name)
    console.log("HERE")
    clientService.searchNameService(req.params.name, function(err, rows) {
        res.render('client', { clientlists: rows });

    });
});
router.get('/api/clientsList',clientController.getClients);
//route for listing all products
router.get('/api/catalog', productController.getCatalogue);
//routes for dynamic processing of clients
//-----------------------------------------------
//route for registration
router.post('/api/register', clientController.registerControl);
//route for login
router.post('/api/login', clientController.loginControl);

//export router
module.exports = router;