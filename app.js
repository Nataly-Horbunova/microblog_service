require('dotenv').config();
const express = require('express');
const { server } = require('config'); 

const app = express();
const{ port } = server;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('views', 'views'); 
app.use('view engine', 'ejs');


app.listen(port, console.log(`Server is running on port ${port}`));