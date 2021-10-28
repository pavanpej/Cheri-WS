const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema

const mongo = {
    url: 'mongodb://127.0.0.1:27017/Cheri',
    opt: {
        useNewUrlParser: true
    }
};

let connection = {};

const userSchema = Schema({
    userId: { type: String },
    name: { type: String },
    emailId: { type: String },
    password: { type: String },
    contactNo: { type: Number },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
}, { collection: "User" });

connection.getUserCollection = () => {
    return mongoose.connect(mongo.url, mongo.opt).then((database) => {
        console.log("Connected to Cheri database");
        return database.model('User', userSchema)
    }).catch((error) => {
        console.log(error.message);
        let err = new Error("Could not connect to database");
        err.status = 500;
        throw err;
    })
}

module.exports = connection;