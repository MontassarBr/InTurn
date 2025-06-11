import express from "express";
import {AuthController} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authentication.js";



const AuthRouter = express.Router();

AuthRouter.post("/register", (req, res) => {
  AuthController.register(req, res);
});

AuthRouter.post("/login", (req, res) => {
  AuthController.login(req, res);
});


AuthRouter.post("/logout", (req, res) => {
  AuthController.logout(req, res);
})

AuthRouter.get('/me', authenticate,  (req, res) => {
  AuthController.getAll(req, res);
})

export default AuthRouter;