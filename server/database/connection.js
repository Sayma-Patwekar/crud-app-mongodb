// using mongoose module we can connect mongodb database to our application
const mongoose = require('mongoose');

//creating synchronous function using asyn await
const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected : ${con.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB

