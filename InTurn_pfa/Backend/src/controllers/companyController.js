import { Company } from "../models/CompanyModel.js";

export class CompanyController {
  static async getProfile(req, res) {
    const companyID = +req.params.id;

    if (!companyID || isNaN(companyID)) {
      return res.status(400).send({ message: "Invalid or missing ID" });
    }

    try {
      const companyData = await Company.getProfile(companyID);
      if (Object.keys(companyData).length !== 0) {
        res.status(200).send(companyData);
      } else {
        res.status(404).send({ message: "Company not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getProfileAuth(req, res) {
    const companyID = +req.user.id;

    if (!companyID || isNaN(companyID)) {
      return res.status(400).send({ message: "Invalid or missing ID" });
    }

    try {
      const companyData = await Company.getProfile(companyID);
      if (Object.keys(companyData).length !== 0) {
        res.status(200).send(companyData);
      } else {
        res.status(404).send({ message: "Company not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async updateProfile(req, res) {
    const id = +req.user.id;

    if (!id || isNaN(id)) {
      res.status(400).send({ message: "Invalid or missing ID" });
      return;
    }

    try {
      const result = await Company.updateProfile(id, req.body);

      if (result) {
        // student = await Student.getStudent(id);
        res.status(200).send({ message: "Profile updated successfully" });
        return;
      } else {
        res.status(404).send({ message: "Company not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async postInternship(req, res) {
    const companyID = +req.user.id;

    if (!companyID || isNaN(companyID)) {
      return res.status(400).send({ message: "Invalid or missing ID" });
    }

    try {
      const internshipID = await Company.postInternship(companyID, req.body);
      if (internshipID !== -1) {
        return res.status(200).json({
          message: "Internship posted successfully",
          id: internshipID,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid company ID: Company does not exist" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async trackApplications(req, res) {
    const companyID = +req.user.id;

    if (!companyID || isNaN(companyID)) {
      return res.status(400).send({ message: "Invalid or missing ID" });
    }

    try {
      const result = await Company.trackApplications(companyID);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "No applications found" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async updateApplicationStatus(req, res) {
    const { studentID, internshipID, applicationDate, status } = req.body;

    if (!applicationDate || !applicationDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return res
        .status(400)
        .json({ error: "Invalid or missing applicationDate format" });
    }
    const validStatuses = ["accepted", "rejected"];
    if (!status || !validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ error: "Invalid status. Allowed values: accepted, rejected" });
    }

    try {
      const result = await Company.updateApplicationStatus(
        status,
        studentID,
        internshipID,
        applicationDate
      );
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "No application found to update" });
      }

      res
        .status(200)
        .send({ result, message: "Application status updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async fetchLatestInternshipsById(req, res) {
    try {
      const companyID = +req.user.id;
      const result = await Company.fetchLatestInternshipsById(companyID);
      console.log(result);
      if (result) {
        res.status(200).send(result);
        return;
      } else {
        res.status(404).send({ message: "No internships found" });
        return;
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}
