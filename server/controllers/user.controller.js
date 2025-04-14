import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "Registered successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    generateToken(res, existingUser, `Welcome back, ${existingUser.name}`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("jwt", "", { maxAge: 0 }).json({
      message: "Logged Out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let photoUrl = user.photoUrl;

    if (profilePhoto) {
      if (user.photoUrl) {
        const oldImageId = user.photoUrl.split("/").pop().split(".")[0];

        deleteMedia(oldImageId);
      }

      const cloudResponse = await uploadMedia(profilePhoto.path);
      photoUrl = cloudResponse.secure_url;
    }

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
