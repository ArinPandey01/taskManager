const express=require('express');
const routes=require('./routes/taskRoutes');
const connectDB = require('./db/connection');
require('dotenv').config();
const app=express();
app.use(express.json());
app.use('/task/v1/',routes);

(()=>{
    try{
        connectDB(process.env.DB_URL);
        app.listen(3000,()=>{
            console.log('server listening on port 3000....');
        })
    }catch(err){
        console.log(`Error has occured:\n${err}`)
    }
})();