import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import {validationResult , matchedData} from "express-validator";
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js'


export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};


//註冊 validation+controller
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  //user signup
  //如果已經存在email一樣的user就回傳錯誤，重複註冊

  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);
  console.log(data);

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(401).send("User already registered");

  const hashedPassword = await hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  //註冊成功後幫用戶清除token並傳一個新token給他
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    domain: "localhost",
    signed: true,
    path: "/",
  });

  //產生jwt token給使用者with cookies
  const token = createToken(user._id.toString(), user.email, "7d");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  res.cookie(COOKIE_NAME, token, {
    path: "/",
    domain: "localhost",
    expires,
    httpOnly: true,
    signed: true,
  });

  //
  return res
    .status(201)
    .json({ message: "OK", name: user.name, email: user.email });
};



//登入 validation+controller
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  //user login
  //如果已經存在email一樣的user就回傳錯誤，重複登錄

  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);
  console.log(data);

  const { email, password } = req.body;
  //登入:  檢查資料庫有沒有這個email的使用者，沒有就回傳錯誤
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("User cannot be found");
  //檢查密碼是否正確
  const isPasswordCorrect = await compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(403).send("Incorrect Password");
  }

  //如果有之前的登入token要先清除
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    domain: "localhost",
    signed: true,
    path: "/",
  });

  //產生jwt token給使用者with cookies
  const token = createToken(user._id.toString(), user.email, "7d");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  res.cookie(COOKIE_NAME, token, {
    path: "/",
    domain: "localhost",
    expires,
    httpOnly: true,
    signed: true,
  });

  return res.status(201).json({
    message: "OK",
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  });
};






//驗證
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};