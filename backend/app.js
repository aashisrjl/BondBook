const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("this is home");
})

//about page



app.listen(port,()=>{
    console.log("server is running on port:"+ port)
})
