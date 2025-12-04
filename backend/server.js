import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser  from 'body-parser';

import  authRoutes  from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // <-- BẮT BUỘC
app.use(express.urlencoded({ extended: true })); // <-- BẮT BUỘC
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => res.send("API running"));


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`conneted server ${PORT}`);
})