import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser  from 'body-parser';

dotenv.config();

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(cors({
  origin: ["http://localhost:3000"], 
  credentials: true,
}));


app.get("/",(req,res)=>{
     res.send("API is running successfully!");
})


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`conneted server ${PORT}`);
})