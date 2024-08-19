var express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


class DbExtendedFunctions {
    constructor(db){
        this.db = db;
    }
    
      method(){
     if(this.db.connect() != false){
        this.db.query('SELECT NOW()', (err, res) => {
            console.log(err,res);
            this.db.end(err => {
                console.log('client has disconnected')
                if (err) {
                  console.log('error during disconnection', err.stack)
                }
              })
            
          })
     } else {
   this.db.connect();
   this.db.query('SELECT NOW()', (err, res) => {
   console.log(err,res);
   this.db.end(err => {
    console.log('client has disconnected')
    if (err) {
      console.log('error during disconnection', err.stack)
    }
  })
 
 })
     }
        
 }
}

const extension = new DbExtendedFunctions(client);






module.exports = {
    client
}


