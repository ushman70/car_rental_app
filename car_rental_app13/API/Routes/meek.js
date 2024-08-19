const express = require('express');
const router = express.Router();
const db = require('../Controllers/ormconfig');
const User = require('../Model/users')


router.post('/', async function(req,res,next) {
    
try {
    console.log(req.headers, req.body.name)
const found = await User.User.findAll({
   where: {
      name: req.body.name 
   }
}).then(user =>{
   
   if(user.length > 0){
      
      return res.status(400).send("Already exists")
   } else {
      return res.status(200).send("OK")
   }
})

} catch (error) {
console.log('Your problem is', error)
}


    
    

})



module.exports = router;