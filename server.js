const express=require('express');
const app=express();
const routes=require('./routes/taskRoutes');
app.use(express.json());
app.use('/task/v1/',routes);

app.listen(3000,()=>{
    console.log('server listening on port 3000....');
})