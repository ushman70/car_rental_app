const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Client } = require('pg');




router.get('/', async function (req, res, next) {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
    const value = Number(req.query.data)
    const query = {
        text: 'SELECT * FROM car LIMIT $1',
        values: [value]
    }
    console.log(req.cookies)

    await client.connect();
    client.query(query, (err, resp) => {
        if(resp){
            console.log(resp.rows)
            client.end()
        } else {
            console.log(err)
            client.end()
        }
        console.log(resp.rows)
        return res.send(resp.rows);
    })
})

module.exports = router;