const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader.startsWith('Bearer'))
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log('validating...')
            if (err) return res.sendStatus(403); 
            req.user = decoded.Tokenized_User;
            next();
        }
    );
}

module.exports = verifyJWT;