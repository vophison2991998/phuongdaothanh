import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser  from 'body-parser';

dotenv.config();

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("API running"));


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`conneted server ${PORT}`);
})