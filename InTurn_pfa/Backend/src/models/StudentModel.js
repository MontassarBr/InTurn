import { pool } from "../database.js";
import InternshipRouter from "../routes/internshipRoutes.js";

export class Student {
  static async updateProfile(id, reqBody) {
    const [res1] = await pool.query("SELECT 1 FROM User WHERE userId = ?", [
      id,
    ]);

    if (res1.length === 0) {
      return 0;
    }

    const {
      about,
      description,
      firstName,
      lastName,
      location,
      title,
      profilePic,
      openToWork,
      experiences,
      education,
    } = reqBody;

    const { skills } = reqBody;
    await pool.query("DELETE FROM skills WHERE studentId = ?", [id]);
    for (const skill of skills) {
      await pool.query("INSERT INTO skills (studentId, skill) VALUES(?,?)", [
        id,
        skill,
      ]);
    }

    await pool.query(
      "UPDATE User SET description = ?, location = ? , profilePic = ? WHERE userID = ?",
      [description, location, profilePic, id]
    );

    await pool.query(
      "UPDATE Student SET firstName = ?, lastName = ?, about = ?, openToWork = ?, title =? WHERE studentID = ?",
      [firstName, lastName, about, openToWork, title, id]
    );

    const [res] = await pool.query(
      "DELETE FROM ProExperience WHERE StudentId = ?",
      [id]
    );
    for (const experience of experiences) {
      // if (experienceID) {
      //   await pool.query(
      //     "UPDATE ProExperience SET title = ?, startDate = ?, endDate = ?, companyName = ?, description = ?, employmentType = ? WHERE experienceID = ?",
      //     [
      //       experience.title,
      //       experience.startDate,
      //       experience.endDate,
      //       experience.companyName,
      //       experience.description,
      //       experience.employmentType,
      //       experienceID,
      //     ]
      //   );
      // } else {
      if (experience.endDate) {
        await pool.query(
          "INSERT INTO ProExperience (studentID, title, startDate, endDate, CompanyName, description) VALUES (?,?,?,?,?,?)",
          [
            id,
            experience.title,
            experience.startDate.substring(0, 10),
            experience.endDate.substring(0, 10),
            experience.companyName,
            experience.description,
          ]
        );
      } else {
        await pool.query(
          "INSERT INTO ProExperience (studentID, title, startDate, CompanyName, description) VALUES (?,?,?,?,?)",
          [
            id,
            experience.title,
            experience.startDate.substring(0, 10),
            experience.companyName,
            experience.description,
          ]
        );
      }

      // }
    }

    const [result] = await pool.query(
      "DELETE FROM Education WHERE studentID = ?",
      [id]
    );

    for (const edu of education) {
      // if (result.length > 0) {
      //   await pool.query(
      //     "UPDATE Education SET institution = ?, diploma = ?, endDate = ?, startDate = ?, location = ? WHERE studentID = ?",
      //     [
      //       edu.institution,
      //       edu.diploma,
      //       edu.endDate,
      //       edu.startDate,
      //       edu.location,
      //       id,
      //     ]
      //   );
      // } else {
      if (edu.endDate) {
        await pool.query(
          "INSERT INTO Education (studentID, institution, diploma, endDate, startDate, location) VALUES (?,?,?,?,?,?)",
          [
            id,
            edu.institution,
            edu.diploma,
            edu.endDate.substring(0, 10),
            edu.startDate.substring(0, 10),
            edu.location,
          ]
        );
      } else {
        await pool.query(
          "INSERT INTO Education (studentID, institution, diploma, startDate, location) VALUES (?,?,?,?,?)",
          [
            id,
            edu.institution,
            edu.diploma,
            edu.startDate.substring(0, 10),
            edu.location,
          ]
        );
      }
    }

    return 1;
  }

  static async getProfile(id) {
    const [[exists]] = await pool.query(
      "SELECT 1 FROM Student WHERE studentID = ?",
      [id]
    );

    if (!exists) {
      return {};
    }
    const [[user]] = await pool.query(
      "SELECT profilePic, location, description FROM User WHERE userID = ?",
      [id]
    );

    const [[student]] = await pool.query(
      "SELECT studentID as userID, CONCAT(firstName, ' ', lastName) AS name, about, openToWork, title FROM Student WHERE studentid = ?",
      [id]
    );
    const [experiences] = await pool.query(
      "SELECT experienceID, title, companyName, description, CONCAT(startDate,'  /  ', endDate) AS duration, startDate, endDate, employmentType FROM ProExperience WHERE studentID = ?",
      [id]
    );
    const [education] = await pool.query(
      "SELECT institution, diploma, CONCAT(startDate, '  /  ', endDate) as duration, startDate, endDate, location FROM Education WHERE studentID = ?",
      [id]
    );
    const [skills] = await pool.query(
      "SELECT skill FROM Skills WHERE studentID = ?",
      [id]
    );

    return {
      ...(user || {}),
      ...(student || {}),
      experiences: experiences || [],
      education: education || [],
      skills: skills.map((skill) => skill.skill) || [],
    };
  }
  static async trackApplications(id) {
    const [[cv]] = await pool.query("Select cvFile FROM student");

    const [apps] = await pool.query(
      `
      SELECT u2.profilePic AS profilePic, companyName, internship.title, internship.internshipID, internship.location, applicationDate, application.status
      FROM user u1
      JOIN student ON u1.userID = student.studentID 
      JOIN application ON application.studentID = student.studentID
      JOIN internship ON internship.internshipID = application.internshipID
      JOIN company ON company.companyID = internship.companyID
      JOIN User u2 ON u2.userId = company.companyID
      WHERE student.studentID = ?
      ORDER BY applicationDate DESC;
  `,
      [id]
    );

    const { cvFile } = cv;

    return {
      ResumeUrl: cvFile,
      applications: apps,
    };
  }

  static async apply(studentID, internshipID) {
    const [[existsStudent]] = await pool.query(
      "SELECT 1 FROM Student WHERE studentID = ?",
      [studentID]
    );

    const [[existsInternship]] = await pool.query(
      "SELECT 1 FROM Internship WHERE internshipID = ?",
      [internshipID]
    );

    if (!existsStudent || !existsInternship) {
      return 0;
    }

    const [[alreadyApplied]] = await pool.query(
      "SELECT 1 FROM Application WHERE internshipID = ? AND StudentID = ?",
      [internshipID, studentID]
    );

    if (alreadyApplied) {
      return 1;
    }

    const [result] = await pool.query(
      "INSERT INTO Application (StudentID, internshipID, applicationDate) VALUES (?,?,NOW())",
      [studentID, internshipID]
    );

    return 2;
  }
  static async updateCv(id, cvFile) {
    await pool.query(`UPDATE Student SET cvFile = ? WHERE studentID = ?`, [
      id,
      cvFile,
    ]);
  }
}
