const ConnectionString = process.env.MONGO_DB_URL;
const mongoose = require('mongoose');

async function connectToDatabase(){
    try{
    await mongoose.connect(ConnectionString);
    }
    catch(err){
        console.log("Error in connecting to database",err);
    }
}

module.exports = connectToDatabase;