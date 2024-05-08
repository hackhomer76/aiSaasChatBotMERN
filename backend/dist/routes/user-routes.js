import { Router } from "express";
import { getAllUsers } from "../controllers/user-controllers.js";
import User from "../models/User.js";
import { hash } from "bcrypt";
import { validationResult, matchedData } from "express-validator";
import { validate, signupValidator } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), async (req, res, next) => {
    //user signup
    //如果已經存在email一樣的user就回傳錯誤，重複登錄
    const result = validationResult(req);
    if (!result.isEmpty())
        return res.status(400).send({ errors: result.array() });
    const data = matchedData(req);
    console.log(data);
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
        return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res
        .status(201)
        .json({ message: "OK", name: user.name, email: user.email });
});
export default userRoutes;
//# sourceMappingURL=user-routes.js.map