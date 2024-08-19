const express = require('express');
const router = express.Router();
const User = require('../Model/users')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const {v4 : uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
require('dotenv').config()





router.post('/', 
body('name').trim().escape(),
body('password').trim().escape(),
body('email').normalizeEmail()
, async function(req,res){
    const saltRounds = 10;
    const hashed_pass = await bcrypt.hash(req.body.password, saltRounds).then(serialized =>{
        return serialized;
    });

    const access_token = jwt.sign({name: req.body.name},process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
    const refreshtoken = jwt.sign({name: req.body.name},process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1m' })
    const New_User = await User.User.create({
      user_uuid: uuidv4(),
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      discounts_availible: 'none',
      car_taken: 'none',
      car_accidents: 0,
      days_penalized: 0,
      status: 'customer',
      reward_points: 0,
      email: req.body.email,
      password: hashed_pass,
      refreshtoken: refreshtoken
    })
    const result = await New_User.save();
    var name = req.body.name;
    console.log(result);
    res.cookie('jwt', refreshtoken, { httpOnly: false, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ access_token, name });

   
    
})

module.exports = router;