require('dotenv').config({path:'./config/.env'});
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('Some Data is here');
})


// User Router:
const userRouter = require('./router/userRouter');
app.use('/api/v1',userRouter);

// Employee Router:

const employeeRouter = require('./router/employeeRouter');
app.use('/api/v1',employeeRouter);

const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

module.exports = app;