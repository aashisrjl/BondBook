//env config
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

//database connect
const connectToDatabase = require('./database/connection/connection');


const app = express();
const port = process.env.PORT;


app.get("/",(req,res)=>{
    res.send("this is home");
})


connectToDatabase()
    .then(() => {
        console.log('Database connection established...');
        app.listen(port, () => {
            console.log('Server is running on port : '+port);
        });
    })
    .catch((err) => {
        console.error("Database connection failed!", err);
    });

