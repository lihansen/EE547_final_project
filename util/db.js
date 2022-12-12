const mongoose = require("mongoose")
const dotenv = require('dotenv')

dotenv.config();

mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: true
});

mongoose.connection.on('connected', function(){
    console.log("Mongoose default connection is open to "+ process.env.MONGODB_URI);
});

mongoose.connection.on('error', function(err){
    console.log("Mongoose default connection has occured "+err+" error");
});

mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
});

connection
    .then(db => db)
    .catch(err => {
        console.log(err);
    });
