import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z
    .string()
    .min(5, { message: "username must be 5 characters long" })
    .max(20, { message: "username should not be 20 characters long" }),
  password: z
    .string()
    .min(8, { message: "password must be 8 characters long" }),
});
const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // validation of email
    if (!email || !username || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      const errorMsg = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ message: errorMsg });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashPassword });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      res.status(200).json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invaild Credentials" });
    }
    const token =await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({ message: "User signed in", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "errors", error });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('jwt',{
      path:'/'
    })
    res.status(200).json({ message: "User logged out"});

  } catch (error) {
    res.status(500).json({ message: "errors", error });
    
  }
};

export { register, login, logout };
