require('dotenv').config();
const express = require('express');
const { server } = require('config'); 

const app = express();
const{ port } = server;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=> {
    res.render('index');
});

app.get('/user-posts', (req, res)=> {
    res.render('user_posts');
});


app.listen(port, console.log(`Server is running on port ${port}`));