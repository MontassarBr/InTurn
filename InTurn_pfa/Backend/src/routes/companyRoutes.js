import express from "express";
import { CompanyController } from "../controllers/companyController.js";
import { authenticate } from "../middlewares/authentication.js";

const CompanyRouter = express.Router();

CompanyRouter.patch("companies/:id/profile", authenticate, (req, res) => {
  StudentController.updateProfile(req, res);
});

CompanyRouter.get("/profile", authenticate, (req, res) => {
  CompanyController.getProfileAuth(req, res);
});

CompanyRouter.get("/profile/:id", (req, res) => {
  CompanyController.getProfile(req, res);
});

CompanyRouter.put("/profile", authenticate, (req, res) => {
  CompanyController.updateProfile(req, res);
});

CompanyRouter.post("/internship", authenticate, (req, res) => {
  CompanyController.postInternship(req, res);
});

CompanyRouter.get("/applications", authenticate, (req, res) => {
  CompanyController.trackApplications(req, res);
});

CompanyRouter.patch("/applications/status", (req, res) => {
  CompanyController.updateApplicationStatus(req, res);
});

CompanyRouter.get("/internship", authenticate, (req, res) => {
  CompanyController.fetchLatestInternshipsById(req, res);
});
export default CompanyRouter;
