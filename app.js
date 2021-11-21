const express = require('express');
//creating app
const app = express();
//make the app listen on port 
//send the index.html when receiving HTTP GET /

//pass requests to the router middleware
const router = require('./router/apis');
app.use(router); 

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 res.render('index'); //no need for ejs extension
})

app.get("/register", (req, res) => {
    res.render('register');
});

app.get("/contacts", (req, res) => {
    res.render('contacts');
});


app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/client", (req, res) => {
    res.render('client');
});

const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
 console.log(`Cart app listening at http://localhost:${port}`);
});

