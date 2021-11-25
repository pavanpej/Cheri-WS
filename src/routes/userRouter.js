require('dotenv').config()

const express = require('express');
const router = express.Router();

const userService = require('../service/userService');
const User = require('../model/User')
const validator = require('../utilities/Validator');

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

//To login 
router.post('/login', function(req, res, next) {
    let credentials = req.body.credentials;
    let password = req.body.password;

    const user = { credentials: credentials, password: password}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    userService.checkUser(credentials, password).then(result => {
        // res.json(result);
        res.json({result, accessToken: accessToken, status: 200})
    }).catch(err => next(err));
})

//to register 
router.post('/register', async function (req, res, next) {
    validator.validateUserName(req.body.name);
    validator.validateEmailId(req.body.emailId);
    validator.validateContactNo(req.body.contactNo);
    validator.validatePassword(req.body.password);
    let salt = await bcrypt.genSalt(15)
    let hash = await bcrypt.hash(req.body.password, salt)
    req.body.password = hash
    const user = new User(req.body);
    userService.addDetails(user).then(result => {
        if (result != null)
            res.json("Registered Successfully");
    }).catch(err => next(err));
})

//To reset password.
router.put('/resetPassword', function (req, res, next) {
    let contactNo = req.body.contactNo;
    let emailId = req.body.emailId;
    let password = req.body.password;
    userService.resetPassword( contactNo, emailId, password).then((result) => {
        res.status(200);
        res.json(result);
    }).catch((err) => {
        next(err);
    })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authoriation']
    const token = authHeader && authHeader.split(' ')[1]
    if(token ==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = router;