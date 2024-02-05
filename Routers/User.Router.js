import express from "express";
import { authenticate } from "../middleware/Auth.js";
import {
  signup,
  signin,
  signout,
  signedInUser,
  } from "../Controllers/User.Controller.js";

  
  const userRouter = express.Router();
  
  userRouter.post("/signup", signup);
  userRouter.post("/signin", signin);
  userRouter.get("/signout", signout);
  userRouter.get("/", authenticate , signedInUser);
  
  export default userRouter;
  
  
  