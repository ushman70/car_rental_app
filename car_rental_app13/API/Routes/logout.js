const express = require('express');
const router = express.Router();
const User = require('../Model/users')
const { Op } = require("sequelize");

router.post('/', async function(req, res){
    const cookies = req.cookies;
    if(req.body.name === undefined){
       return res.sendStatus(204);
    }
    if(!cookies) return res.sendStatus(204);
    const foundtoken = await User.User.findOne({
        where: {
            name: req.body.name,
            refreshtoken: {
                [Op.ne]: null
            }
        }
    })
   foundtoken.refreshtoken = null;
   const result = await foundtoken.save();
   console.log(foundtoken);

   res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
   res.sendStatus(204);

})

module.exports = router;


