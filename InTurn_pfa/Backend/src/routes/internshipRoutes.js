import express from "express";
import { InternshipController } from "../controllers/internshipController.js";

const InternshipRouter = express.Router();

InternshipRouter.get("/latest", (req, res) => {
  InternshipController.fetchLatestInternships(req, res);
});

// InternshipRouter.get("/default", (req, res) => {
//   InternshipController.fetchDefaultInternships(req, res);
// });

InternshipRouter.get("/filtered", (req, res) => {
  InternshipController.fetchFilteredInternships(req, res);
});

InternshipRouter.get("/:id", (req, res) => {
  InternshipController.getInternship(req, res);
});
export default InternshipRouter;
