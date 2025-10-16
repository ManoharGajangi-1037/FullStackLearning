import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users, User } from "../models/user.model";
import { JWT_SECRET } from "../config";
import { authenticateToken } from "../middlewares/auth.middleware";
let idCounter = 1;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      res.json({
        message: "User already Exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: idCounter++,
      username: username,
      email: email,
      password: hashedPassword,
    };
    users.push(newUser);
    res.status(201).json({
      message: "User Registered",
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) {
      res.status(401).json({
        message: "Email not existed",
      });
      return;
    }

    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) {
      res.status(401).json({
        message: "password not matched",
      });
      return;
    }

    const token = await jwt.sign(
      { userid: user.id, usermail: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Token Created Successfully",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};


export const profile=(req:Request,res:Response,next:NextFunction)=>{
    res.json({
        message:"You are authenticated!!"
    })
}
