import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import generateToken from "../utils/generateToken.util.ts";
import asyncHandler from "express-async-handler";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const userExists = await User.findOne({ name });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, password });
  if (user) {
    generateToken(res, user._id as any);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      uuid: user.uuid,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user: any = await User.findOne({ name });
  if (user && (await user.comparePasswords(password))) {
    generateToken(res, user._id as any);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      uuid: user.uuid,
    });
  } else {
    res.status(401);
    throw new Error("Invalid name or password"); // No need to help hacker by telling them which one is wrong 🤷🏻‍♂️
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      uuid: user.uuid,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;

    try {
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        uuid: user.uuid,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get logout user
// @route   GET /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
};
