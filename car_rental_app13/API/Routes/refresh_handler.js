const User = require('../Model/users')
const jwt = require('jsonwebtoken');
const express = require('express');
const { emptyQuery } = require('pg-protocol/dist/messages');
const router = express.Router();

router.get('/', async function(req,res){
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshtoken = cookies.jwt;
    console.log(refreshtoken)
    const found = await User.User.findAll({
        where: {
           refreshtoken: refreshtoken 
        }
     }).then(user =>{
      console.log('reading promise')
        if(user.length === 0){
         return console.log('refreshtoken is prolly null');
        } else {
         return console.log(user), user[0].dataValues.name;
        }
     })
     console.log('reading', found)
     if (found === undefined) {
      return;
     } else {
      jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET,
         (err, decoded) => {
          
             if (err || found !== decoded.name) return res.sendStatus(403);
             const access_token = jwt.sign({name: decoded.name},process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
 
             res.json({access_token})
         })
     }
     
        
})


module.exports = router;