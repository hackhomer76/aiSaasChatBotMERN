import { Router } from "express";
import {
  getAllUsers,
  userSignup,
  userLogin,
  verifyUser,
} from "../controllers/user-controllers.js";
import { validate, signupValidator, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
//signupPost請求
userRoutes.post("/signup",validate(signupValidator),userSignup);
//loginPost 請求
userRoutes.post("/login", validate(loginValidator), userLogin)
userRoutes.get("/auth-status", verifyToken, verifyUser);








export default userRoutes;
