//env config
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

//database connect
const connectToDatabase = require('./database/connection/connection');
// const passport = require('./services/passport/passport')
const cookieParser = require("cookie-parser");


const port = process.env.PORT;

// packgaes 
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// //app.use(passport.initialize());//
app.use(express.static('./uploads/'));



app.get("/",(req,res)=>{
    res.send("this is home of BondBook");
})

const authRoute  = require('./routes/authRoute/auth.route');
const User = require('./database/models/user.model');
app.use("/",authRoute)
const router = express.Router()
router.get("/user", async(req,res)=>{
    const user = await User.findAll();
    res.status(200).json({
        message: "user find",
        user
    })
});

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

