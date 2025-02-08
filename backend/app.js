//env config
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors')
//database connect
const connectToDatabase = require('./database/connection/connection');
const passport = require('./services/passport/passport')
const cookieParser = require("cookie-parser");

const port = process.env.PORT;

// packgaes 
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const corsOption = {
    origin: ["http://localhost:8081", "http://192.168.1.74:8081"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}

app.use(cors(corsOption));
// //app.use(passport.initialize());//

app.use(passport.initialize());

app.use(express.static('./uploads/'));

// cors origin setup
const cors = require("cors");
const corsOption ={
    origin:"http://localhost:8081",
    methods:["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}
app.use(cors(corsOption));


app.get("/",(req,res)=>{
    res.send("this is home of BondBook");
})

const authRoute  = require('./routes/authRoute/auth.route');
const diaryRoute = require('./routes/diaryRoute/diary.route');
const addressRouter = require("./routes/addressRoute/address.route")
app.use("/",authRoute);
app.use("/",diaryRoute);
app.use("/",addressRouter);


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

