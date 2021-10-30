const mongoose = require("mongoose")
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema

// const mongo = {
//     url: 'mongodb+srv://cheri:Cheri1234@cheri.rigxw.mongodb.net/Cheri?retryWrites=true&w=majority',
//     opt: {
//         useNewUrlParser: true
//     }
// };

URI = 'mongodb+srv://cheri:Cheri1234@cheri.rigxw.mongodb.net/Cheri?retryWrites=true&w=majority';

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
    return mongoose.connect(URI, {useNewUrlParser: true}).then((database) => {
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