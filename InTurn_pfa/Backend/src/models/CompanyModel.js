import { pool } from "../database.js";

export class Company {
  static async getProfile(id) {
    const [[exists]] = await pool.query(
      "SELECT 1 FROM Company WHERE companyId = ?",
      [id]
    );

    if (!exists) {
      return {};
    }

    const [[companyInfo1]] = await pool.query(
      "SELECT description, location, profilePic FROM User WHERE userID = ?",
      [id]
    );

    const [[companyInfo2]] = await pool.query(
      "SELECT * FROM Company WHERE companyID = ?",
      [id]
    );
    const [benefits] = await pool.query(
      "SELECT benefit from CompanyBenefit WHERE CompanyID = ?",
      [id]
    );
    const [internships] = await pool.query(
      "SELECT * FROM Internship WHERE companyID = ? ORDER BY postedDate DESC LIMIT 4",
      [id]
    );
    const [[review]] = await pool.query(
      "SELECT AVG(rating) AS averageRating FROM Review WHERE companyID = ?",
      [id]
    );

    const avgRating = review ? review.averageRating : null;

    return {
      ...companyInfo1,
      ...companyInfo2,
      internships,
      benefits: benefits.map((benefit) => benefit.benefit),
      avgRating,
    };
  }

  static async postInternship(id, internshipData) {
    const [[exists]] = await pool.query(
      "SELECT 1 FROM Company WHERE companyId = ?",
      [id]
    );

    if (!exists) {
      return -1;
    }

    const { responsibilities } = internshipData;

    delete internshipData.responsibilities;

    const fields = Object.keys(internshipData).join(", ");
    const placeholders = Object.keys(internshipData)
      .map(() => "?")
      .join(", ");
    const values = Object.values(internshipData);

    const sql = `INSERT INTO Internship (CompanyID, ${fields}) VALUES (${id}, ${placeholders})`;

    const [res] = await pool.query(sql, values);

    for (const responsibility of responsibilities) {
      await pool.query("INSERT INTO Responsibility VALUES (?,?)", [
        responsibility,
        res.insertId,
      ]);
    }

    return res.insertId;
  }

  static async trackApplications(uid) {
    const [apps] = await pool.query(
      `
    SELECT application.studentID ,application.internshipID ,DATE_FORMAT(applicationDate, '%Y-%m-%d') AS applicationDate ,CONCAT(applicationDate,application.studentID ,application.internshipID) AS id,profilePic,CONCAT(firstName,(' '), lastName) AS name, internship.title, internship.location,cvFile ,application.status
    FROM user
    JOIN student ON user.userID = student.studentID
    JOIN application ON application.studentID = student.studentID
    JOIN internship ON internship.internshipID = application.internshipID
    JOIN company ON company.companyID = internship.companyID
    WHERE company.companyID = ? 
    ORDER BY applicationDate DESC;`,
      [uid]
    );
    return {
      applications: apps,
    };
  }

  static async updateApplicationStatus(
    status,
    studentID,
    internshipID,
    applicationDate
  ) {
    const [apps] = await pool.query(
      `
        UPDATE application SET status = ? 
        WHERE studentID = ? AND internshipID = ? AND applicationDate= ?;`,
      [status, studentID, internshipID, applicationDate]
    );
    return {
      affectedRows: apps.affectedRows,
    };
  }

  static async fetchLatestInternshipsById(companyID) {
    const [latest] = await pool.query(
      `
    SELECT profilePic, company.companyID,title, CONCAT(CAST(minSalary AS UNSIGNED), ('-') , CAST(maxSalary AS UNSIGNED), 'DT') AS salary, companyName, user.location , workArrangement, workTime
    FROM user
    LEFT JOIN company ON user.userID = company.companyID
    LEFT JOIN internship ON internship.companyID = company.companyID
    WHERE status IN ('Pending', 'Published') AND company.companyID = ?
    ORDER BY postedDate DESC
    LIMIT 4
    `,
      [companyID]
    );
    return latest;
  }

  static async updateProfile(id, req) {
    const [[exists]] = await pool.query(
      "SELECT 1 FROM Company WHERE companyId = ?",
      [id]
    );

    if (!exists) {
      return false;
    }

    await pool.query(
      "UPDATE User SET description = ?, location = ?, profilePic = ? WHERE userId = ?",
      [req.description, req.location, req.profilePic, id]
    );

    await pool.query(
      "UPDATE company SET companyName = ?, industry = ?, website = ?, workDayStart = ?, workDayEnd = ? WHERE companyID = ?",
      [
        req.companyName,
        req.industry,
        req.website,
        req.workDayStart,
        req.workDayEnd,
        id,
      ]
    );

    await pool.query("DELETE FROM CompanyBenefit WHERE companyID = ?", [id]);

    for (const benefit of req.benefits) {
      await pool.query("INSERT INTO CompanyBenefit VALUES (?,?)", [
        benefit,
        id,
      ]);
    }

    return true;
  }
}
