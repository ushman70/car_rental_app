var express = require('express');
const { Client } = require('pg');
require('dotenv').config();
var app = express();
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./API/Controllers/DBConfig')
const { body, validationResult } = require('express-validator')
const verifyJWT = require('./API/Controllers/verifyjwt')

app.use(cookieParser());
const allowedOrigins = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5000',
  'http://localhost:5000',
  'http://localhost:3000'
];
var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3000/signup"],
  methods: ["GET,PUT,POST,DELETE,PATCH,OPTIONS"],
  credentials: true,
  allowedHeaders: `Accept,Accept-Language,Content-Language,Content-Type,Authorization,Cookie,X-Requested-With,Origin,Host`,
  optionsSuccessStatus: 200
} 
// middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());






app.use('/fetch', require('./API/Routes/fetch_cars'));
app.use('/meek', require('./API/Routes/meek'));
app.use('/signup/email_verification', require('./API/Routes/signup_email_verification'))
app.use('/signup', require('./API/Routes/signup'))
app.use('/refresh', require('./API/Routes/refresh_handler'))
app.use('/logout', require('./API/Routes/logout'))
app.use('/login', require('./API/Routes/login'))
app.use('/car_select', require('./API/Routes/car_display'))
app.use('/transaction', require('./API/Routes/transaction'))

app.use(verifyJWT);
app.use('/axios_test', require('./API/Routes/Axios_private'))


function validcookie(req, res, next){
  const { cookies } = req;
  if('name' in  cookies) next();

}
app.get('/protected', validcookie, (req,res) =>{
  res.status(200).json({ msg: 'authorized'})
})


app.get('/test', function(req, res, next){
  
  res.setHeader("Access-Control-Allow-Headers", "Accept,Accept-Language,Content-Language,Content-Type,Authorization,Cookie,X-Requested-With,Origin,Host")
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader("withCredentials", true)
  console.log(req.cookies)
  res.cookie('name', 'geeksforgeeks',{ httpOnly: true});
  res.status(200).send('operating')
  next()
   
});















app.listen(5000, function () {
  console.log('listening...')
});