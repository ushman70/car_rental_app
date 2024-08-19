const express = require('express');
const router = express.Router();
const Models = require('../Model/users')
const { Op } = require("sequelize");

router.get('/', async function(req, res){
    const { data } = req.query
    
   
    
    if(isNaN(data)){
        try {
            console.log('data is a string')
            const select_cars = await Models.Car.findAll({
                where: {
                    car_name: data
                }
            })
              
               if(select_cars.length != 0){
                console.log('sent')
                return res.send(select_cars)
               }
           } catch (error) {
           console.log(error)
           }
    } else {

        try {
            console.log('data is not a string')
            const select_cars = await Models.Car.findAll({
                limit: data
            })
               if(select_cars.length != 0){
                return res.send(select_cars)
               }
           } catch (error) {
            console.error(error)
           }

    }
    
})

module.exports = router;