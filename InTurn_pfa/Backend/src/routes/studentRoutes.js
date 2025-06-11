import express from "express";
import { StudentController } from "../controllers/studentController.js";
import { authenticate } from "../middlewares/authentication.js";

const StudentRouter = express.Router();

StudentRouter.patch("students/:id/profile", authenticate, (req, res) => {
  StudentController.updateProfile(req, res);
});

StudentRouter.get("/profile/:id", (req, res) => {
  StudentController.getProfile(req, res);
});

StudentRouter.get("/profile", authenticate, (req, res) => {
  StudentController.getProfileAuth(req, res);
});

StudentRouter.put("/profile", authenticate, (req, res) => {
  StudentController.updateProfile(req, res);
});

StudentRouter.get("/applications", authenticate, (req, res) => {
  StudentController.trackApplications(req, res);
});

StudentRouter.post("/applications", authenticate, (req, res) => {
  StudentController.apply(req, res);
});

StudentRouter.put("/resume", authenticate, (req, res) => {
  StudentController.updateCv(req, res);
});

export default StudentRouter;
