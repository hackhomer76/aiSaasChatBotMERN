import { Router } from "express";
import { getAllUsers, userSignup, userLogin } from "../controllers/user-controllers.js";
import { validate, signupValidator, loginValidator } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
//signupPost請求
userRoutes.post("/signup",validate(signupValidator),userSignup);
//loginPost 請求
userRoutes.post("/login", validate(loginValidator), userLogin)









export default userRoutes;
