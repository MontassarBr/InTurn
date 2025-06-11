import { Student } from "../models/StudentModel.js";

export class StudentController {
  static async updateProfile(req, res) {
    const id = +req.user.id;

    if (!id || isNaN(id)) {
      res.status(400).send({ message: "Invalid or missing ID" });
      return;
    }

    try {
      const result = await Student.updateProfile(id, req.body);

      

      if (result) {
        // student = await Student.getStudent(id);
        res.status(200).send({ message: "Profile updated successfully" });
        return;
      } else {
        res.status(404).send({ message: "Student not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getProfile(req, res) {
    const studentID = +req.params.id;

    if (!studentID || isNaN(studentID)) {
      res.status(400).send({ message: "Invalid or missing ID" });
      return;
    }

    try {
      const studentData = await Student.getProfile(studentID);
      if (Object.keys(studentData).length !== 0) {
        res.status(200).send(studentData);
      } else {
        res.status(404).send({ message: "Student not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getProfileAuth(req, res) {
    const studentID = +req.user.id;

    if (!studentID || isNaN(studentID)) {
      res.status(400).send({ message: "Invalid or missing ID" });
      return;
    }

    try {
      const studentData = await Student.getProfile(studentID);
      const { name } = studentData;
      const [firstName, lastName] = name.split(" ");
      studentData["firstName"] = firstName;
      studentData["lastName"] = lastName;
      if (Object.keys(studentData).length !== 0) {
        res.status(200).send(studentData);
      } else {
        res.status(404).send({ message: "Student not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async trackApplications(req, res) {
    const studentID = +req.user.id;

    if (!studentID || isNaN(studentID)) {
      res.status(400).send({ message: "Invalid or missing ID" });
      return;
    }

    try {
      const result = await Student.trackApplications(studentID);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "No applications found" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async apply(req, res) {
    const studentID = +req.user.id;
    const internshipId = +req.body.internshipId;

    if (!studentID || isNaN(studentID)) {
      res.status(400).send({ message: "Invalid or missing ID" });
      return;
    }

    try {
      const code = await Student.apply(studentID, internshipId);
      if (code === 2) {
        res.status(200).send({ message: "Application registred successfully" });
        return;
      } else if (code === 1) {
        res.status(404).send({ message: "Already Applied" });
        return;
      } else {
        res.status(404).send({ message: "Student or internship not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  static async updateCv(req, res) {
    const id = +req.user.id;

    if (!id || isNaN(id)) {
      res.status(400).send({ message: "Invalid or missing ID" });
      return;
    }

    try {
      cvFile = req.body.fileData;
      const result = await Student.updateCv(id, cvFile);

      if (result) {
        res.status(200).send({ message: "Cv updated successfully" });
        return;
      } else {
        res.status(404).send({ message: "Student not found" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
