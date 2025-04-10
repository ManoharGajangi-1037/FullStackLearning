import { Request, Response } from "express";
import { users, User } from "../models/user.model";

export const getAllUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};
export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;

    res.json(user);
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.status(204).send();
};

export const getUserByName = (req: Request, res: Response) => {
  console.log("naaa", req.params.name);
  const user = users.find((u) => u.name === String(req.params.name));
  if (!user) res.status(404).json({message:"No message found"});
  res.json(user);
};
