import { Request, Response } from "express";
import User from "../model/user";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email } = req.body;
    console.log(req.body);

    if (!username || !email) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    const newUser = await User.create({ username, email });
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

