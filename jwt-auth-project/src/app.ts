import express, { NextFunction, Request,Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Jwt Auth API",
  });
});
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
     res.json({
        message:err
     });
});

export default app;
