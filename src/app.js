const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const userRouter = require('./routes/userRouter')

const requestLogger = require('./utilities/RequestLogger')
const errorLogger = require('./utilities/ErrorLogger')

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(requestLogger);

app.use('/user', userRouter)

app.use(function (req, res) {
    return res.status(404).send({message: "Route not found"} )
})

app.use(errorLogger)

app.listen(process.env.PORT || 3000);  
console.log("Server listening in port 3000"); 

module.exports = app;