const express=require('express')
const app=express();
const connectDB=require('./db')
const port =5000;
connectDB();
app.get('/',(req,res)=>{

    res.send("Hello this is note taking app")
})

app.listen(port , ()=>{
    console.log("Server is Successfully running on port ",port)
})