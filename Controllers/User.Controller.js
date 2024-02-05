// signup,
// signin,
// signout,
// getAllUsers,
// signedInUser,
import User from "../Models/User.Model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/Jwt.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: "all fields are required" });
      }
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const token = generateToken(user);
  
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .status(200)
        .json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: "Account with this email already exists!" });
      }
  
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: req.body.role ||"Customer", // this is bad practice, but added to avoid having to add an extra controller
      });
  
      if (!newUser) {
        return res.status(400).json({ error: "Error creating user! Check with Mongo" });
      }
  
      const token = generateToken(newUser);



      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
  
      res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ err: "Internal Server Error", msg: error });
    }
  };
  
  export const signout = async (req, res) => {
    try {
      res.clearCookie("token");
      return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  export const signedInUser = (req, res) => {
    return res.status(200).json({ user: req.user });
  };
  
