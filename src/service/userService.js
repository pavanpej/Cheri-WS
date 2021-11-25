const User = require('../model/User');
const userdb = require('../model/userModel');
const validator = require('../utilities/Validator');

const bcrypt = require('bcrypt')

let UserService = {}

//To check whether the user registered if so, then allow him/her to login
UserService.checkUser = (credentials, password) => {
    validator.validatePassword(password)
    let contactNo = null;
    let emailId = "";
    if (String(credentials).match(/^[1-9][0-9]{9}$/)) {
        contactNo = Number(credentials);
        validator.validateContactNo(credentials);
    }
    else {
        emailId = credentials; 
        validator.validateEmailId(credentials);
    }
    return userdb.findUser(contactNo, emailId).then(userData => {

        if (userData == null) {
            let err = new Error("User not available!! Please register");
            err.status = 404;
            throw err;
        } else {
            if (userData.emailId === emailId || userData.contactNo == contactNo) {
                // if (userData.password === password)
                bcrypt.compare(password, userData.password, (err, data) => {
                    if (data) {
                        return userData;
                    } else {
                        err = new Error("Password is Incorrect");
                        err.status = 404;
                        throw err;
                    }
                });
            }
            else {
                let err = new Error("Authentication failed");
                err.status = 404;
                throw err;
            }
        }
    })
}

//Tocheckwhileregisteringthatwhetherthelogincredential already exist or not. If not allow him/her to register
UserService.addDetails = (UserObj) => {
    return userdb.findUser(UserObj.contactNo, UserObj.emailld).then(object => {
        {
            if (object != null) {
                let err = new Error("User already exists with this emailld and contact Number");
                err.status = 404;
                throw err;
            } else {
                return userdb.generateId().then((data) => {
                    UserObj.userId = data;

                    return userdb.addUser(UserObj).then((data) => {
                        if (data) {
                            return data;
                        }
                        else {
                            let err = new Error("Unable to Register");
                            err.status = 404;
                            throw err;
                        }
                    })
                })
            }
        }
    })
}

UserService.resetPassword = (contactNo, emailId, password) => {
    return userdb.findUserByContact(contactNo).then(object => {
        if(object.emailId == emailId) {
            return userdb.resetPassword(object.userId, password).then((data)=>{
                if(data) {
                    return object.userId;
                } else {
                    let err = new Error("Password Reset Failed");
                    err.status = 503;
                    throw err;
                }
            })
        } else {
            let err = new Error("Authentication Failed");
                    err.status = 404;
                    throw err;
        }
    })
}


module.exports = UserService;