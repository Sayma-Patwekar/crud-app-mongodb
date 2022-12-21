//creating http server using express

const express = require('express');
const dotenv = require('dotenv'); // dotenv module allows you to separate your secrets(credentiaLs eg,host,user,pw) from source code - helpful when you are working in collaborating environment there  you share only source code and other person create his own .env file
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

const connectDB = require('./server/database/connection');

dotenv.config({path : 'config.env'});
const PORT = process.env.PORT || 8080; // run on port defined in config.evn file if port no. is not found then run server on port 8080(as default)

//log requests : morgan module allows to log the requests on the console whenever we make a request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parseer
app.use(bodyparser.urlencoded({extended:true})); //

//set view engine
app.set("view engine","ejs") //here we are using ejs template engine if you are using html then can write html in place of ejs // if you are creating all ejs files in views directly then use this stmt else

//if you are creating all ejs files inside another folder in views say views/ejs/(all ejs files) then use following stmt to set view engine path.
//app.set("views",path.resolve(__dirname,"views/include"));

//load assests : dirnamr returns current directory name//successfully load assests inside http server
app.use('/css',express.static(path.resolve(__dirname,"assets/css"))); // assests/css is now prefix for /css
//css/style.css  //if you have created style.css inside assests/css/style.css
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
})