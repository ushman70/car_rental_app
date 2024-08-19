const express = require('express');
const router = express.Router();
const User = require('../Model/users')

router.post('/', async function(req, res){
    try {
     const found = User.User.findAll({
         where: {
            email: req.body.email 
         }
     }).then(response =>{
         if(response.length > 0){
            return res.status(200).send("This email already exists");
         } else {
             return res.status(200).send("OK");
         }
     })
    } catch (error) {
        
    }
})

module.exports = router;