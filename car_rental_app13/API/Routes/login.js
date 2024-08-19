const express = require('express');
const router = express.Router();
const User = require('../Model/users')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
require('dotenv').config()

router.post('/', 
body('name').trim().escape(),
body('password').trim().escape(),
async function (req, res){
   const { password, name } = req.body;
   const founduser = await User.User.findAll({
    where: {
        name: name
    }
   })

   if(founduser.length == 0){
    return res.sendStatus(404)
   }
    
   
  const match = await bcrypt.compare(password, founduser[0].password).then((result) =>{
        if(result === false){
          return false;
        } else {
            return true;
        }
    })
    
    if(match === false){
     return  res.sendStatus(403)
    }
    
    if(founduser[0].refreshtoken !== null){
        const hacked_user = User.User.update({refreshtoken: null}, {
             where: {
                name: founduser[0].name
             }
        })
        
        
        return res.sendStatus(500)
    }
    
    const access_token = jwt.sign({name: name},process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
    const refreshtoken = jwt.sign({name: name},process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1m' })
    console.group(name)
    const update_user = User.User.update({refreshtoken: refreshtoken}, {
        where: {
            name: founduser[0].name
        }
    })
    
    res.cookie('jwt', refreshtoken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ access_token, name });


}
)
module.exports = router;