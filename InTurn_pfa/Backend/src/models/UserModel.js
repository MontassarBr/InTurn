import { pool } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) =>
  jwt.sign(
    { id: user.userID, email: user.email, userType: user.userType },
    JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

export class User {
  static async createUser(req) {
    const { email, password, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "Insert Into user (email, password, userType) VALUES (?,?,?)",
      [email, hashedPassword, userType]
    );

    if (userType === "student") {
      const { firstName, lastName } = req.body;
      const [student] = await pool.query(
        "Insert Into Student (studentID, firstName, lastName) VALUES (?,?,?)",
        [result.insertId, firstName, lastName]
      );
    } else {
      const { firstName } = req.body;
      const [company] = await pool.query(
        "INSERT INTO company (companyID, companyName) VALUES (?,?)",
        [result.insertId, firstName]
      );
    }

    const user = {
      userID: result.insertId,
      email: email,
      userType: userType,
    };

    const userToken = generateToken(user);

    return { ID: result.insertId, Token: userToken };
  }
  static async userExists(email) {
    const [existingUser] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return true;
    }

    return false;
  }

  static async login(email, password) {
    const [record] = await pool.query("SELECT * FROM User WHERE email = ?", [
      email,
    ]);

    const user = record[0];

    const isSamePwd = await bcrypt.compare(password, user.password);

    console.log(isSamePwd);

    if (!isSamePwd) {
      return {};
    }

    const userToken = generateToken(user);

    return {
      token: userToken,
      id: user.userID,
    };
  }

  static async getAll(id) {
    const [[exists]] = await pool.query("SELECT 1 FROM User WHERE userId = ?", [
      id,
    ]);

    if (!exists) {
      return {};
    }

    const [[user]] = await pool.query(
      "SELECT userID, userType, profilePic FROM User WHERE userID = ?",
      [id]
    );

    return user;
  }
}
