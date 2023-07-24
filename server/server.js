const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development'])

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.status(200).json('Hello there!')
})

//get all data for specific user
app.get('/user:id', function(req, res) {
    const user_account_id = req.params.id
    knex('user_accounts')
        .select('*')
        .where('DoD_id', user_account_id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => 
        res.status(500).json({
            message: 'An error occured while fetching the user data'
        }))
})

//get all satellites
app.get('/satellites', function(req, res) {
    knex('satellite')
        .select('*')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => 
        res.status(500).json({
            message: 'An error occured while fetching satellites'
        }))
})
//get by SATCAT
app.get('/satellite/:SATCAT', function (req, res) {
    const SATCATNum = req.params.SATCAT;
    knex('satellite')
    .select("*")
    .where("SATCAT", SATCATNum)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => 
    res.status(500).json({
        message: 'An error occured while fetching data for the selected satellite'
    }))
})

//get all posts for the statellite (using the SATCAT)
app.get('/posts:SATCAT_id', function (req, res) {
    const SATCATNum = req.params.SATCAT_id;
    knex('posts')
    .select("*")
    .where("SATCAT_id", SATCATNum)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => 
    res.status(500).json({
        message: 'An error occured while fetching the posts for the selected satellite'
    }))
})

app.listen(port, () => console.log(`You are now listening live at http://localhost:${port}!`))