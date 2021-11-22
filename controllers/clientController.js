const { Client } = require('../models/entities');
const loginControl = (request, response) => {
    const clientServices = require('../services/clientServices');
    let username = request.body.username;
    let password = request.body.password;
    if (!username || !password) {
        response.render(`incorrectPassBlank`)
    } else {
        if (request.session && request.session.user) {
            alert("Already signed-in!");
            response.render(`index`)
        } else {
            clientServices.loginService(username, password, function(err, dberr, client) {
                console.log("Client from login service :" + JSON.stringify(client));
                if (client === null) {
                    console.log("Auhtentication problem!");
                    response.render(`incorrectPass`)
                } else {
                    console.log("User from login service :" + client[0].num_client);
                    //add to session
                    request.session.user = username;
                    request.session.num_client = client[0].num_client;
                    request.session.admin = false;
                    response.send(`Login (${username}, ID.${client[0].num_client}) successful!`);
                    response.end();
                }
            });
        }
    }
};


const registerControl = (request, response) => {
    const clientServices = require('../services/clientServices');
    let username = request.body.username;
    let password = request.body.password;
    let society = request.body.society;
    let contact = request.body.contact;
    let addres = request.body.addres;
    let zipcode = request.body.zipcode;
    let city = request.body.city;
    let phone = request.body.phone;
    let fax = request.body.fax;
    let max_outstanding = request.body.max_outstanding;
    let client = new Client(username, password, 0, society, contact, addres, zipcode, city, phone, fax, max_outstanding);

    clientServices.registerService(client, function(err, exists, insertedID) {
        console.log("User from register service :" + insertedID);
        if (exists) {
            alert("Username taken!");
            response.render(`register`); //invite to register
        } else {
            client.num_client = insertedID;
            alert("Successful Registration, you can now Sign-in");
            response.send(`login`);
        }
        response.end();
    });
};

const getClients = (request, response) => {
    const clientServices = require('../services/clientServices');
    clientServices.searchService(function(err, rows) {
        response.json(rows);
        response.end();
    });
};

const getClientByNumclient = (request, response) => {
    const clientServices = require('../services/clientServices');
    let num_client = request.params.num_client;
    clientServices.searchNumclientService(num_client, function(err, rows) {
        response.json(rows);
        response.end();
    });
};

module.exports = {
    loginControl,
    registerControl,
    getClients,
    getClientByNumclient
};