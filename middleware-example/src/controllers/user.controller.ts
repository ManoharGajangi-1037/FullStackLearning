import { Request, Response } from "express";
import { users, User } from "../models/user.model";

export const getAllUsers = (req: Request, res: Response) => {
  res.send(users);
};
export const createUser = (req: Request, res: Response) => {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const user = users.find((user) => user.id == Number(req.query.id));
  if (!user) {
    res.status(404).json({
      message: "User Not Found",
    });
  }
  users.filter((user) => user.id != Number(req.query.id));
  res.send({
    msg: "Deleted User",
    user: user,
  });
};
