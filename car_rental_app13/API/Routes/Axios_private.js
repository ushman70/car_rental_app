const express = require('express');
const router = express.Router();
const a_t = require('../Model/axiosintercept_tester')

router.get('/', async function(req,res,next){
    const fetch_users = await a_t.findAll()
    console.log(fetch_users)
    res.json(fetch_users)

})

module.exports = router;
