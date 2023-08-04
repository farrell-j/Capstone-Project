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
const sanitizeHtml = require('sanitize-html');

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
app.get('/posts/:SATCAT_id', (req, res) => {
    const SATCATNum = req.params.SATCAT_id;
  
    knex
      .select(
        'posts.post_id',
        'posts.post_author',
        'posts.SATCAT_id',
        'posts.date_posted',
        'posts.post_text',
        'posts.up_votes',
        'posts.down_votes',
        'posts.contested',
        'posts.contested_comment',
        'posts.contested_by',
        'user_accounts.firstname',
        'user_accounts.lastname',
        'user_accounts.email'
      )
      .from('posts')
      .where('SATCAT_id', SATCATNum)
      .join('user_accounts', 'posts.post_author', 'user_accounts.DoD_id')
      .orderBy('up_votes', 'desc')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(500).json({
          message: 'An error occurred while fetching the posts for the selected satellite',
          err: err
        })
      );
  });
  
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

//get all contested posts

app.get('/contestedposts', (req, res) => {
    knex('posts')
        .select('*')
        .where('contested', true)
        .then(data => res.status(200).json(data))
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
        await knex('user_accounts')
            .count('DoD_id')
            .where('DoD_id', newUser.DoD_id)
            .then(data => {
                if(data[0].count > 0) {
                    res.status(500).json('Username is taken!')
                } else {
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
                }
            })
        })
})

//add a post for a satellite (tested good)
// app.post('/posts/:SATCAT_id', (req,res) => {
//     const SATCAT = req.params.SATCAT_id;
//     const { post_text } = req.body;
//     knex('posts')
//         .insert({ "SATCAT_id": SATCAT, "post_text": post_text })
//         .then(data => {res.status(200).json('Posted.')})
//         .catch(err => {res.status(500).json({message: 'An error occurred while posting', error:err})})
// })

app.post('/posts/:SATCAT_id', (req, res) => {
    const SATCAT = req.params.SATCAT_id;
    console.log(req.body);
    const {post_text, post_author} = req.body;
    const sanitizedContent = sanitizeHtml(post_text);
    console.log(sanitizedContent);

    knex('posts')
        .insert({ SATCAT_id: SATCAT, post_text : sanitizedContent, post_author, up_votes: 0, down_votes: 0, contested: false, contested_comment: '' })
        .then(() => {
            res.status(200).json({message: 'Content saved to posts'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Error in saving post to server', err:err})
        })
})

//post a new satellite (tested good)
app.post('/satellite', (req,res) => {
    //satellite info should include { SATCAT, created_by_id, launch_date, + orbital params }
    console.log(req.body)
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
            .returning('*')
            .then(updatedData => {
                    res.status(200).json(updatedData)
                })
})

//patch to posts table (used for up and down votes)
app.patch('/post/:id', (req, res) => {
    const id = req.params.id;
    const { up_votes, down_votes } = req.body;
  
    knex('posts')
      .select('up_votes', 'down_votes')
      .where('post_id', id)
      .first()
      .then((post) => {
        
        const newUpVotes = post.up_votes + (up_votes ? 1 : 0); 
        const newDownVotes = post.down_votes + (down_votes ? 1 : 0); 
  
        knex('posts')
          .where('post_id', id)
          .update({ up_votes: newUpVotes, down_votes: newDownVotes })
          .then(() => {
            res.status(200).json('Votes Updated!');
          })
          .catch((error) => {
            console.error('Error updating votes:', error);
            res.status(500).json({ error: 'An error occurred while updating votes.' });
          });
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
      });
  });

//patch req to handle contesting information
app.patch('/contestpost/:post_id', (req, res) => {
    const postID = req.params.post_id;
    console.log(postID)
    const { contested, contested_comment, contested_by, post_text } = req.body;

    const updateInfo = { contested, contested_comment, contested_by }

    if(post_text !== undefined) {
        updateInfo.post_text = post_text;
    }

    knex('posts')
        .where('post_id', postID)
        .update(updateInfo)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => { res.status(500).json('Issue with patching contested info')})
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
            knex('satellite')
                .select('*')
                .then(data => res.status(200).send(data));
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