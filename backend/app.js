//env config
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
//database connect
const connectToDatabase = require('./database/connection/connection');
const passport = require('./services/passport/passport')
const cookieParser = require("cookie-parser");
// const session = require('express-session');

const port = process.env.PORT;

// packgaes 
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(passport.initialize());

// static file
app.use(express.static('./uploads/'));

// cors origin setup
const cors = require("cors")

const corsOption = {
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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
const remainderRoute = require("./routes/remainderRoute/remainder.route")
const timelineRoute = require("./routes/timelineRoute/timeline.route")
const photoRoute = require('./routes/photoRoute/photo.route')
const userRoute = require('./routes/userRoute/user.route')

app.use("/",authRoute);
app.use("/",diaryRoute);
app.use("/",addressRouter);
app.use("/",remainderRoute);
app.use("/",timelineRoute);
app.use("/",photoRoute);
app.use("/",userRoute);


connectToDatabase()
    .then(() => {
        console.log('Database connection established...');
        app.listen(port, '0.0.0.0',() => {
            console.log('Server is running on port : '+port);
        });
    })
    .catch((err) => {
        console.error("Database connection failed!", err);
    });

