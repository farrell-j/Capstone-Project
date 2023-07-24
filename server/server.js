require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development'])
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.status(200).json('Hello there!')
})

app.post('/login', (req, res) => {
    // Authenticate User
    const DoD_id = req.body.DoD_id
    const user = { id: DoD_id}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

//get all data for a specific user
app.get('/user/:id', function(req, res) {
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

//get info for all the satellites
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
//get satellite info by SATCAT
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
app.get('/posts/:SATCAT_id', function (req, res) {
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

// Create new user
app.post('/register', function(req, res) {
    const { DoD_id, password } = req.body;
    const hashedPass = bcrypt.hash(password, 10);
    const newUser = {
        DoD_id: BigInt(DoD_id),
        firstname: firstname,
        lastname: lastname,
        email: email,
        organization: organization,
        password: hashedPass,
        moderator: moderator
    };
    return knex('user_accounts')
        .insert(newUser)
        .returning('*')
    .then(addedUser) = addedUser.map(user => {
        delete user.password;
        return user
    })
    .then(data => res.status(200).json(addedUser))
    .catch(err => {
        res.status(500).json({
            message: 'An error occurred while creating new user'
        })
    })
})

app.post('/posts', (req,res) => {
    const post = req.body
    knex('posts')
        .insert(post)
        .then(data => res.status(200).json('Posted.'))
})

app.post('/satellite', (req,res) => {
    const satellite = req.body
    knex('satellite')
        .count('*')
        .where('SATCAT', satellite.SATCAT)


        .insert(satellite)
        .then(data => res.status(200).json('Posted.'))
})
    
app.listen(port, () => console.log(`You are now listening live at http://localhost:${port}!`))