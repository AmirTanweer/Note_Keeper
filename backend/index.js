const express=require('express')
const app=express();
const connectDB=require('./db')
const port =5000;
const AuthRouter=require('./routes/authRoute')
const NoteRouter=require('./routes/noteRoute')
connectDB();

app.use(express.json());
 
app.get('/',(req,res)=>{

    res.send("Hello this is note taking app")
}) 
app.use('/api/auth', AuthRouter)
app.use('/api/notes',NoteRouter)
app.listen(port , ()=>{
    console.log("Server is Successfully running on port ",port)
})