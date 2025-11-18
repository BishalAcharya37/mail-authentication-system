import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDb.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";


dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    res.send("Hello World");
});


app.use("/api/auth", authRoutes);


app.listen(PORT || 3001, ()=>{
    connectDB();
    console.log(`Server is running at: ${PORT}`);
});