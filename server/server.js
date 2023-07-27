require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development'])
const jwt = require('jsonwebtoken')
// const uuid = require('uuid')

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
  };

app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.status(200).json('Hello there!')
})

async function getUserFromDb(DoD_id, password) {
    const user = await knex('user_accounts')
        .select('*')
        .where('DoD_id', DoD_id)
        .first();
        
    if (user == null) {
        return null;
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
        return user;
    } else {
        return null; 
    }
    }

app.post('/login', async (req, res) => {
    // Authenticate User
    const DoD_id = req.body.DoD_id
    const password = req.body.password
    const user = await getUserFromDb(DoD_id, password); 
    if (user == null) {
        return res.status(400).send('User does not exist')
    }

    const options = {
        httpOnly:true
    }

    // const jwt_id = uuid.v4();

    // const hopeful = jwt.sign({...user, jwt_id},`${process.env.ACCESS_TOKEN_SECRET}${user.DoD_id}`)
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    user["accessToken"] = accessToken;
    res.status(200).json(user)
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user; 
        next()
    })
}

// 
// GET REQUESTS BELOW
// 

//get all data for a specific user (tested good)
app.get('/user/:id', authenticateToken, function(req, res) {
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

//get all users (tested good)
app.get('/users', (req,res) => {
    knex('user_accounts')
        .select('*')
        .then(data => res.status(200).json(data))
})

//get info for all the satellites (tested good)
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
//get satellite info by SATCAT (tested good)
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

//get all posts for the statellite (using the SATCAT) (tested good)
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

//get all single post by post_id (tested good)
app.get('/post/:id', function (req, res) {
    const id = req.params.id;
    knex('posts')
    .select("*")
    .where("post_id", id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => 
    res.status(500).json({
        message: 'An error occured while fetching the posts for the selected satellite'
    }))
})

// get all posts (tested good)
app.get('/posts', (req,res) => {
    knex('posts')
        .select('*')
        .then(data => res.status(200).json(data))
})

app.get('/search/:search', (req,res) => {
    let searchString = req.params.search;
  
    if(typeof searchString !== 'string') {
      searchString.toString();
    }
    knex('satellite')
      .select('*')
      .whereILike('SATCAT', `%${searchString}%`)
      .orWhere('created_by_id', 'ilike', `%${searchString}%`)
      .orWhere('launch_date', 'ilike', `%${searchString}%`)
      .then(data => res.status(200).send(data));
})

app.get('/search/', (req,res) => {
    knex('satellite')
        .select('*')
        .then(data => res.status(200).send(data));
  })

// 
//  POST REQUESTS BELOW
// 

// Create new user (tested good)
app.post('/register', function(req, res) {
    const newUser = req.body;
    bcrypt.hash(newUser.password, 10)
        .then(data => newUser.password = data)
        .then(async data => {
            knex('user_accounts')
                .insert(newUser)
                .returning('*')
            .then(data => {
                newUser.password = '';
                res.status(200).json(newUser)})
            .catch(err => {
                res.status(500).json({
                    message: 'An error occurred while creating new user',
                    'err': `${err}`
                })
            })
        })
})

//add a post for a satellite (tested good)
app.post('/posts/:SATCAT_id', (req,res) => {
    const SATCAT = req.params.SATCAT_id;
    const { post_text } = req.body;
    knex('posts')
        .insert({ "SATCAT_id": SATCAT, "post_text": post_text })
        .then(data => {res.status(200).json('Posted.')})
        .catch(err => {res.status(500).json({message: 'An error occurred while posting', error:err})})
})

//post a new satellite (tested good)
app.post('/satellite', (req,res) => {
    //satellite info should include { SATCAT, created_by_id, launch_date, + orbital params }
  const satellite = req.body
    knex('satellite')
        .insert(satellite)
        .then(data => {
            res.status(200).json('satellite posted.')})
        .catch(err => {res.status(500).json({message: 'An error occurred while posting satellite', error:err})})
})      

// 
// PATCH REQUESTS BELOW
// 

// edit user information (tested good)
app.patch('/user/:id', (req,res) => {
    const editedUser = req.body;
    const id = req.params.id
    if(editedUser.password) {
        bcrypt.hash(editedUser.password, 10)
            .then(data => editedUser.password = data)
            .then(data => {
                knex('user_accounts')
        .where('DoD_id', id)
        .update(editedUser)
        .then(data => {
                res.status(200).json('Updated!')
            })
            })
    } else {
        knex('user_accounts')
            .where('DoD_id', id)
            .update(editedUser)
            .then(data => {
                    res.status(200).json('Updated!')
                })
    }
})

//edit satellite information (tested good)
app.patch('/satellite/:satcat', (req,res) => {
    const editSat = req.body
    const satcat = req.params.satcat

    knex('satellite')
            .where('SATCAT', satcat)
            .update(editSat)
            .then(data => {
                    res.status(200).json('Updated!')
                })
})

//patch posts based off post_id (tested good)
app.patch('/post/:id', (req, res) => {
    const editPost = req.body
    const id = req.params.id

    knex('posts')
        .where('post_id', id)
        .update(editPost)
        .then(data => {
                res.status(200).json('Updated!')
            })
})

// 
// DELETE REQUESTS BELOW
// 

//deletes a user account (tested good)
app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    knex('user_accounts')
        .where('DoD_id', id)
        .del()
        .then(() => {
            res.status(200).json('User deleted successfully')
        })
})

//deletes a satellite (tested good)
app.delete('/satellite/:satcat', (req, res) => {
    const satcat = req.params.satcat
    knex('satellite')
        .where('SATCAT', satcat)
        .del()
        .then(() => {
            res.status(200).json('Satellite deleted successfully')
        })
})

//delete a single post by post id (tested good)
app.delete('/post/:id', (req, res) => {
    const id = req.params.id;
    knex('posts')
        .where('post_id', id)
        .del()
        .then(() => {
            res.status(200).json('Post deleted successfully')
        })
})


//SPECIAL PROXY END POINT TO FETCH DATA FROM EXTERNAL API
// app.get('/proxy-tle/:id', async (req, res) => {
//     let id = req.params.id
//     try {
//       const response = await fetch(`https://tle.ivanstanojevic.me/api/tle/${id}`);
//       const data = await response.json();
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching data from the external API' });
//     }
// });

// Track_Tool SPECIAL PROXY END POINT TO FETCH DATA FROM EXTERNAL API 
//_UPDATED_ To allow for multiple seraches seperated by comma 
app.get('/proxy-tle', async (req, res) => {
    const satelliteIds = req.query.ids;
    
    if (!satelliteIds) {
      return res.status(400).json({ message: 'Please provide satellite "ids" in the your query' });
    }
  
    const idsArray = satelliteIds.split(',').map((id) => id.trim());
  
    try {
      const responses = await Promise.all(
        idsArray.map(async (id) => {
          const response = await fetch(`https://tle.ivanstanojevic.me/api/tle/${id}`);
          return response.json();
        })
      );
  
      res.json(responses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching from NASA API' });
    }
  });


app.listen(port, () => console.log(`You are now listening live at http://localhost:${port}!`))