const express = require('express');
const router = express.Router();

const userService = require('../service/userService');
const User = require('../model/User')

//To login 
router.post('/login', function(req, res, next) {
    let credentials = req.body.credentials;
    let password = req.body.password;
    userService.checkUser(credentials, password).then(result => {
        res.json(result);
    }).catch(err => next(err));
})

//to register 
router.post('/register', function (req, res, next) {
    const user = new User(req.body);
    userService.addDetails(user).then(result => {
        if (result != null)
            res.json("Registered Successfully");
    }).catch(err => next(err));
})

//To edit user profile.
router.put('/editProfile', function (req, res, next) {
    let userId = req.body.userId;
    let name = req.body.name;
    let password = req.body.password;
    let contactNo = req.body.contactNo;
    userService.updateProfile(userId, name, password, contactNo).then((result) => {
        res.status(200);
        res.json(result);
    }).catch((err) => {
        next(err);
    })
})

module.exports = router;