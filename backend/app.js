const dotnev = require('dotenv');
dotnev.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT

app.get("/",(req,res)=>{
    console.log("this is home");
})

app.listen(PORT,()=>{
    console.log("server is running on port:"+ PORT)
})
