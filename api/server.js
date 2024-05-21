// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express();


server.use(express.json()) ;



server.post('/api/users', (req,res)=> {
    const {name, bio} = req.body;
    if(!name || !bio){
        return res.status(400).json({message: 'Please provide name and bio for the user'})
    }
    Users.insert({name, bio})
    .then(user => {
        res.status(201).json(user)
    })
    .catch (() => {
        res.status(500).json({message:'There was an error while saving the user to the server'})
    })
})

server.get('/api/users', (req, res) => {
  Users.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch (() => {
    res.status(500).json({message:'The users informaion could not retrieved'})
  })
})


server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    Users.findById(id)
    .then(user => {
        if(user) {
            res.status(200).json(user)

        } else {
        res.status(404).json({message: 'does not exist'})
    }
})
.catch(() => {
    res.status(500).json({message:'The users informaion could not retrieved'})
 
})
})

server.delete('/api/users/:id', (req, res) => {
    const { id} = req.params;
   Users.remove(id)
   .then(deleteUser => {
    if(deleteUser){
        res.status(200).json(deleteUser)
 } else {
    res.status(404).json({message: 'The user with the specified Id does not exist'})
 }
   })
   .catch(() => {
    res.status(500).json({message:'The user could not be removed'})
   })    
})

server.put('/api/users/:id', (req, res) => {

    const {id} = req.params;
    const {name, bio} = req.body;
    if(!name || !bio){
        return res.status(400).json({message:'provide name and bio'})
    }
   Users.update(id, {name, bio})
   .then(updatedUser => {
    if(updatedUser) {
        res.status(200).json(updatedUser)
    }else{
        res.status(404).json({message: 'The user with the specified Id does not exist'})
    }
   })
  .catch(() => {
    res.status(500).json({message:'The user information could not be modified'})
  })
    
})


module.exports = server; 
