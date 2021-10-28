const userdb = require('../model/userModel');
const validator = require('../utilities/Validator');

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
                if (userData.password === password)
                    return userData;
                else {
                    let err = new Error("Password is Incorrect");
                    err.status = 404;
                    throw err;
                }
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
    validator.validateUserName(UserObj.name);
    validator.validateEmailId(UserObj.emailId);
    validator.validateContactNo(UserObj.contactNo);
    validator.validatePassword(UserObj.password);
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

module.exports = UserService;