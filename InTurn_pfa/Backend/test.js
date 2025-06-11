
// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL");
});

// Function to execute SQL query with parameters
function executeSelectQuery(res, sql, params = []) {
  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
}
function executeUpdateQuery(res, sql, params = []) {
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json({ message: "Application status updated successfully" });
  });
}
// Function to verify the id
function verifyId(id) {
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid or missing ID" });
  }
}

// API to fetch 4 inernships with pagination
app.get("/data", (req, res) => {
  let offset = parseInt(req.query.offset) || 0;
  let sql = `
            SELECT location, internship.description, profilePic, title, type, minSalary, maxSalary, status, companyName, website, user.description AS companyDescription, industry, workDayStart, workDayEnd, responsibility
            FROM user
            LEFT JOIN company ON user.userID = company.companyID
            LEFT JOIN internship ON internship.companyID = company.companyID
            LEFT JOIN responsibility ON internship.internshipID = responsibility.internshipID
            WHERE status IN ('Pending', 'Published')
            ORDER BY internship.internshipID ASC
            LIMIT 4 OFFSET ?    `;

  executeSelectQuery(res, sql, [offset]);
});

// API to fetch 4 internships with pagination and filtering
app.get("/data2", (req, res) => {
  let offset = parseInt(req.query.offset) || 0;

  let filters = {
    title: null,
    location: null,
    type: null,
    industry: null,
    payment: null,
  };

  if (req.query.search) filters.title = req.query.search;
  if (req.query.location) filters.location = req.query.location;
  if (req.query.type) filters.type = req.query.type;
  if (req.query.companyType) filters.industry = req.query.industry;
  if (req.query.payment) filters.payment = req.query.payment;

  let { sql1, sql2, sql3, params, paramsDesc } = buildInternshipQuery(
    filters,
    offset
  );

  Promise.all([
    new Promise((resolve, reject) => {
      db.query(sql1, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(sql2, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(sql3, paramsDesc, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }),
  ])

    .then(([results1, results2, results3]) => {
      const concatResults = [...results1, ...results3];
      res.json({ table1: concatResults, table2: results2 });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Function to Build the Query
function buildInternshipQuery(filters, offset) {
  let baseQuery = `
        FROM user
        LEFT JOIN company ON user.userID = company.companyID
        LEFT JOIN internship ON internship.companyID = company.companyID
        LEFT JOIN responsibility ON internship.internshipID = responsibility.internshipID
        WHERE status IN ('Pending', 'Published')`;

  let baseQuery1 = `
        FROM user
        LEFT JOIN company ON user.userID = company.companyID
        LEFT JOIN internship ON internship.companyID = company.companyID
        LEFT JOIN responsibility ON internship.internshipID = responsibility.internshipID
        WHERE status IN ('Pending', 'Published')`;

  let params = [];
  let paramsDesc = [];

  // Add Filters
  for (let key in filters) {
    if (filters[key]) {
      if (key === "title") {
        baseQuery += ` AND title LIKE ?`;
        params.push(`%${filters[key]}%`);

        baseQuery1 += ` AND title NOT LIKE ? AND internship.description REGEXP ?`;
        paramsDesc.push(`%${filters[key]}%`, "\\b" + filters[key] + "\\b");
      } else {
        baseQuery += ` AND ${key} = ?`;
        baseQuery1 += ` AND ${key} = ?`;
        params.push(filters[key]);
        paramsDesc.push(filters[key]);
      }
    }
  }

  // Add Pagination
  baseQuery += ` ORDER BY internship.internshipID ASC LIMIT 4 OFFSET ?`;
  baseQuery1 += ` ORDER BY internship.internshipID ASC LIMIT 4 OFFSET ?`;
  params.push(offset);
  paramsDesc.push(offset);

  let titleQuery = `
        SELECT location, internship.description, profilePic, title, type, minSalary, maxSalary, status, companyName, website, 
        user.description AS companyDescription, industry, workDayStart, workDayEnd, responsibility
        ${baseQuery}`;

  let descriptionQuery = `
        SELECT location, internship.description, profilePic, title, type, minSalary, maxSalary, status, companyName, website, 
        user.description AS companyDescription, industry, workDayStart, workDayEnd, responsibility
        ${baseQuery1}`;

  let countQuery = `SELECT count(*) ${baseQuery}`;

  return {
    sql1: titleQuery,
    sql3: descriptionQuery,
    sql2: countQuery,
    params,
    paramsDesc,
  };
}

// API to fetch latest 6 inernships
app.get("/data1", (req, res) => {
  let sql = `
            SELECT profilePic, title, minSalary, maxSalary, companyName, location, type, status, postedDate
            FROM user
            LEFT JOIN company ON user.userID = company.companyID
            LEFT JOIN internship ON internship.companyID = company.companyID
            WHERE status IN ('Pending', 'Published')
            ORDER BY postedDate ASC
            LIMIT 6`;
  executeSelectQuery(res, sql);
});

// API to track internships for the student
app.get("/track/:id", (req, res) => {
  let uid = req.params.id;
  // Validate ID (assuming it's numeric)
  verifyId(uid);
  let sql = `
    SELECT profilePic, companyName, title, location, applicationDate, application.status
    FROM user
    JOIN student ON user.userID = student.studentID 
    JOIN application ON application.studentID = student.studentID
    JOIN internship ON internship.internshipID = application.internshipID
    JOIN company ON company.companyID = internship.companyID
    WHERE student.studentID = ?
    ORDER BY applicationDate DESC;
`;

  executeSelectQuery(res, sql, [uid]);
});

// API to track internships for the company
app.get("/track1/:id", (req, res) => {
  let uid = req.params.id;
  // Validate ID (assuming it's numeric)
  verifyId(uid);
  let sql = `
    SELECT profilePic, firstName, lastName, title, location, cvFile
    FROM user
    JOIN student ON user.userID = student.studentID
    JOIN application ON application.studentID = student.studentID
    JOIN internship ON internship.internshipID = application.internshipID
    JOIN company ON company.companyID = internship.companyID
    WHERE company.companyID = ? 
    ORDER BY applicationDate DESC;`;

  executeSelectQuery(res, sql, [uid]);
});

//API to accept or reject internships
app.patch("/track2", (req, res) => {
  const { studentID, internshipID, applicationDate, status } = req.query;
  verifyId(studentID);
  verifyId(internshipID);
  if (!applicationDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return res.status(400).json({ error: "Invalid applicationDate format" });
  }
  const validStatuses = ["accepted", "rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const sql = `UPDATE application SET status = ? WHERE studentID = ? AND internshipID = ? AND applicationDate= ?`;
  executeUpdateQuery(res, sql, [
    status,
    studentID,
    internshipID,
    applicationDate,
  ]);
});

//to run
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
