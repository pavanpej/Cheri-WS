const collection = require('../utilities/connection');
const short = require('shortid');

const userModel = {}

//To check whether the user with conatctNo or emailld exist or not 
userModel.findUser = (contactNo, emailId) => {
    return collection.getUserCollection().then(model => {
        return model.findOne({ $or: [{ "emailId": emailId }, { 'contactNo': contactNo }] }).then((userData) => {
            if (userData === null) {
                return null;
            } else {
                return userData;
            }
        })
    })
}

//To check whether the user with contact exist or not 
userModel.findUserByContact = (contact) => {
    return collection.getUserCollection().then(model => {
        return model.findOne({ "contactNo": contact }).then((userData) => {
            if (userData === null) {
                return null;

            } else {
                return userData;
            }
        })
    })
}

//To check whether the user with email id exist or not 
userModel.findUserByEmail = (emailId) => {
    return collection.getUserCollection().then(model => {
        return model.findone({ "emailId": emailId }).then((userData) => {
            if (userData === null) {
                return null;

            } else {
                return userData;
            }
        })
    })
}

// To generate userId for new User 
userModel.generateId = () => {
    return collection.getUserCollection().then((userModel) => {
        return userModel.distinct("userId").then((ids) => {
            // let idarr = ids.map( ( data ) => { return Number( data.slice( 1 ) ) } )
            // let bId = Math.max( ... idarr ); 
            // return "U" + ( bId + 1 ); 
            return short()
        })
    })
}

//to add a user
userModel.addUser = (newUser) => {
    return collection.getUserCollection().then(userModel => {
        return userModel.create(newUser).then(data => {
            if (data)
                return true;
            else
                return false;
        })
    })
}

//To update user profile.
userModel.updateProfile = (userId, name, password, contactNo) => {
    return collection.getUserCollection().then(model => {
        return model.updateOne({ "userId": userId }, { $set: { "name": name, "password": password, "contactNo": contactNo } }).then((data) => {
            // console.log(data); 
            if (data.nModified == 1) {
                return userId;
            } else {
                return null;
            }
        })
    })
}
module.exports = userModel;