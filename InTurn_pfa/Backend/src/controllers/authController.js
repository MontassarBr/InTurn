import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AuthController {
  // Register a new user
  static async register(req, res) {
    const { email } = req.body;

    if (await User.userExists(email)) {
      return res.status(400).send({ message: "Email already exists" });
    }

    try {
      const { ID, Token } = await User.createUser(req);
      res.status(201).json({
        message: "User registered successfully",
        id: ID,
        token: Token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Handle user login
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!(await User.userExists(email))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Authenticate user credentials
      const user = await User.login(email, password);

      if (Object.keys(user).length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { id, token } = user;
      // Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      res.status(200).send({
        message: "Login successful",
        UserID: id,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  // Log the user out by clearing the cookie
  static async logout(req, res) {
    res.clearCookie("token");
    res.send({ message: "Logged out successfully" });
  }

  // Retrieve all data for a specific user
  static async getAll(req, res) {
    const userID = +req.user.id;

    if (!userID || isNaN(userID)) {
      res.status(400).send({ message: "Invalid or missing ID" });
      return;
    }

    try {
      const userData = await User.getAll(userID);
      if (Object.keys(userData).length !== 0) {
        res.status(200).send(userData);
      } else {
        res.status(404).send({ message: "User not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
