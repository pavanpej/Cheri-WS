let Validator = {};

//to validate user name
Validator.validateUserName = function (name) {
    let check = String(name).match( /^[a-zA-Z]+[a-zA-Z ]*$/ )
    if (!check) {
        let err = new Error('Not a valid name');
        err.status = 400;
        throw err;
    }
}

//to validate emailId
Validator.validateEmailId = function (emailId) {
    let check = String(emailId).match( /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?)$/ )
    if (!check) {
        let err = new Error('Not a valid emailId');
        err.status = 400;
        throw err;
    }
}
//to validate conatactNo
Validator.validateContactNo = function (contactNo) {
    let check = String(contactNo).match( /^[7-9][0-9]{9}$/ )
    if (!check) {
        let err = new Error('Not a valid Phone number');
        err.status = 400;
        throw err;
    }
}

//to validate password
Validator.validatePassword = function (password) {
    let check = String(password).match( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/ )
    if (!check) {
        let err = new Error('Not a valid password');
        err.status = 400;
        throw err;
    }
}

module.exports = Validator;