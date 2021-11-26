const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const userRouter = require('./src/routes/userRouter')

const requestLogger = require('./src/utilities/RequestLogger')
const errorLogger = require('./src/utilities/ErrorLogger')

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server started in port ${PORT}`));

// app.listen(process.env.PORT || 3000);  
// console.log("Server listening in port 3000"); 

module.exports = app;