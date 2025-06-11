import { pool } from "../database.js";
export class Internship {
  static async fetchLatestInternships() {
    const [latest] = await pool.query(`
    SELECT profilePic, title, CONCAT(CAST(minSalary AS UNSIGNED), ('-') , CAST(maxSalary AS UNSIGNED), 'DT') AS salary,
    companyName, internship.location , workArrangement, workTime
    FROM user
    LEFT JOIN company ON user.userID = company.companyID
    LEFT JOIN internship ON internship.companyID = company.companyID
    WHERE status IN ('Pending', 'Published')
    ORDER BY postedDate DESC
    LIMIT 6
    `);
    return latest;
  }
  static async fetchDefaultInternships(offset) {
    const [defaultInternships] = await pool.query(
      `
      SELECT internship.location,companyID, internship.description, profilePic, title, workArrangement,
      workTime,CONCAT(CAST(minSalary AS UNSIGNED), ('-') , CAST(maxSalary AS UNSIGNED), 'DT') AS salary, status, companyName,
      website, user.description AS companyDescription, industry,CONCAT( workDayStart,('-'), workDayEnd) AS workingDays, responsibility
      FROM user
      LEFT JOIN company ON user.userID = company.companyID
      LEFT JOIN internship ON internship.companyID = company.companyID
      LEFT JOIN responsibility ON internship.internshipID = responsibility.internshipID
      WHERE status IN ('Pending', 'Published')
      ORDER BY internship.internshipID ASC
      LIMIT 4 OFFSET ? `,
      [offset]
    );
    return defaultInternships;
  }

  static async fetchFilteredInternships(filters, offset) {
    let baseQuery = `
        FROM user
        LEFT JOIN company ON user.userID = company.companyID
        LEFT JOIN internship ON internship.companyID = company.companyID
        LEFT JOIN responsibility ON internship.internshipID = responsibility.internshipID
        WHERE status IN ('Pending', 'Published')`;
    let params = [];

    // Add Filters
    for (let key in filters) {
      if (filters[key]) {
        if (key === "title") {
          baseQuery += ` AND title LIKE ?`;
          params.push(`%${filters[key]}%`);
        } else {
          if (key === "indeustry") {
            baseQuery += ` AND company.${key} = ?`;
            params.push(filters[key]);
          } else {
            baseQuery += ` AND internship.${key} = ?`;
            params.push(filters[key]);
          }
        }
      }
    }
    // Add Pagination
    baseQuery += ` ORDER BY internship.internshipID ASC LIMIT 4 OFFSET ?`;
    params.push(offset);

    let titleQuery =
      `
          SELECT internship.internshipID AS id,user.profilePic,internship.location,internship.companyID, internship.description,  title,
          workArrangement, workTime,CONCAT(CAST(minSalary AS UNSIGNED), '-' , CAST(maxSalary AS UNSIGNED), 'DT') AS salary,
          status, companyName, website,CONCAT( workDayStart,'-', workDayEnd) AS workingDays,user.description AS companyDescription,
          industry, workDayStart, workDayEnd, responsibility` + baseQuery;

    let countQuery = `SELECT count(*) AS total ${baseQuery}`;

    return {
      searchQuery: titleQuery,
      totalCountQuery: countQuery,
      params,
    };
  }

  static async get(id) {
    const [res1] = await pool.query(
      `
  SELECT 
    internship.location, 
    internship.internshipID AS id, 
    company.companyID, 
    internship.description, 
    profilePic,
    title, 
    workArrangement, 
    workTime, 
    CONCAT(CAST(minSalary AS UNSIGNED), '-', CAST(maxSalary AS UNSIGNED), 'DT') AS salary, 
    status,
    companyName,
    website,
    CONCAT(workDayStart, '-', workDayEnd) AS workingDays,
    user.description AS companyDescription,
    industry,
    workDayStart,
    workDayEnd
  FROM Internship 
  JOIN Company ON Internship.companyID = company.companyID 
  JOIN User ON user.userID = Internship.companyID
  WHERE Internship.InternshipID = ?
`,
      [id]
    );

    const [res2] = await pool.query(
      "SELECT responsibility FROM Responsibility WHERE internshipID = ?",
      [id]
    );

    return { ...res1, ...res2 };
  }

  // static async fetchInternships(filters, offset) {
  //   let filterWhere = "WHERE ";
  //   for (const filter in filters) {
  //     if (filters[filter]) {
  //       const value =
  //         typeof filters[filter] === "string"
  //           ? `'${filters[filter]}'`
  //           : filters[filter];
  //       filterWhere += `Internship.${filter} = ${value} AND `;
  //     }
  //   }

  //   const lastAnd = filterWhere.lastIndexOf("AND");
  //   filterWhere = filterWhere.slice(0, lastAnd).trim();

  //   if (filterWhere === "WHERE") {
  //     filterWhere = "";
  //   }

  //   console.log(filterWhere);

  //   const [result] = await pool.query(`
  // SELECT
  //   Internship.internshipID AS id,
  //   User.profilePic,
  //   Internship.location,
  //   Internship.companyID,
  //   Internship.description,
  //   Internship.title,
  //   Internship.workArrangement,
  //   Internship.worktime,
  //   CONCAT(CAST(minSalary AS UNSIGNED), '-', CAST(maxSalary AS UNSIGNED), ' DT') AS salary,
  //   Internship.status,
  //   Company.companyName,
  //   Company.website,
  //   CONCAT(workDayStart, '-', workDayEnd) AS workingDays,
  // FROM Internship
  // JOIN Company ON Internship.companyID = Company.companyID
  // JOIN User ON User.userID = Internship.companyID ${filterWhere}`);

  //   for (const internship of result) {
  //     const { id } = internship;
  //     const [res] = pool.query(
  //       "SELECT responsibility FROM Responsibility WHERE internshipID = ?",
  //       [id]
  //     );

  //     const item = res.find((obj) => obj.id === id);

  //     item.responsibility = res;
  //   }

  //   const total = result.length;

  //   const pages = Math.ceil(total / 4);

  //   const index = offset * 4;

  //   return {
  //     internships: result.slice(index, index + 4),
  //     totalPages: pages,
  //     totalResults: total,
  //   };
  // }

  static async fetchInternships(filters, offset, search) {
    let result1 = [];

    if (search) {
      const param = search;
      console.log(param);

      let param2 = param
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      param2 += "%";
      param2 = "%" + param2;
      console.log(param2);
      [result1] = await pool.query(
        `
    SELECT 
      Internship.internshipID AS id,
      User.profilePic,
      Internship.location,
      Internship.companyID,
      Internship.description,
      Internship.title,
      Internship.workArrangement,
      Internship.worktime AS workTime,
      user.description AS companyDescription,
      company.industry AS companyType,
      CONCAT(CAST(minSalary AS UNSIGNED), '-', CAST(maxSalary AS UNSIGNED), 'DT') AS salary,
      Internship.status,
      Company.companyName,
      Company.website,
      CONCAT(workDayStart, '-', workDayEnd) AS workingDays
    FROM Internship
    JOIN Company ON Internship.companyID = Company.companyID
    JOIN User ON User.userID = Internship.companyID
    WHERE internship.title LIKE ? ORDER BY postedDate DESC
  `,
        [param2]
      );

      for (const internship of result1) {
        const [res] = await pool.query(
          "SELECT responsibility FROM Responsibility WHERE internshipID = ?",
          [internship.id]
        );

        for (let res2 of result1) {
          if (res2.id === internship.id) {
            res2.responsibilities = [];
            for (const respo of res) {
              res2.responsibilities.push(respo.responsibility);
            }
          }
        }
      }
    }

    let filterWhere = "WHERE ";
    for (const filter in filters) {
      if (filters[filter]) {
        const value =
          typeof filters[filter] === "string"
            ? `'${filters[filter]}'`
            : filters[filter];

        if (filter === "industry") {
          filterWhere += `company.${filter} = ${value} AND `;
        } else {
          if (filter == "location") {
            const str = `'%${value}%'`;
            const frontIndex = 2;
            const backIndex = str.length - 3;

            // Remove both
            const updated = str
              .split("")
              .filter((_, i) => i !== frontIndex && i !== backIndex)
              .join("");

            console.log(updated);
            filterWhere += `Internship.${filter} LIKE ${updated} AND `;
          } else {
            filterWhere += `Internship.${filter} = ${value} AND `;
          }
        }
      }
    }

    const lastAnd = filterWhere.lastIndexOf("AND");
    filterWhere = filterWhere.slice(0, lastAnd).trim();

    if (filterWhere === "WHERE") {
      filterWhere = "";
    }

    let result = [];

    console.log(filters);

    const isAllUndefined = Object.values(filters).every(
      (value) => value === undefined
    );

    console.log(isAllUndefined, search);

    console.log(isAllUndefined && search === undefined);

    if (
      (isAllUndefined && search === undefined) ||
      (search === undefined && !isAllUndefined) ||
      (!isAllUndefined && search !== undefined)
    ) {
      [result] = await pool.query(`
    SELECT 
      Internship.internshipID AS id,
      User.profilePic,
      Internship.location,
      Internship.companyID,
      Internship.description,
      Internship.title,
      Internship.workArrangement,
      Internship.worktime AS workTime,
      user.description AS companyDescription,
      company.industry AS companyType,
      CONCAT(CAST(minSalary AS UNSIGNED), '-', CAST(maxSalary AS UNSIGNED), 'DT') AS salary,
      Internship.status,
      Company.companyName,
      Company.website,
      CONCAT(workDayStart, '-', workDayEnd) AS workingDays
    FROM Internship
    JOIN Company ON Internship.companyID = Company.companyID
    JOIN User ON User.userID = Internship.companyID
    ${filterWhere} ORDER BY postedDate DESC
  `);

      for (const internship of result) {
        const [res] = await pool.query(
          "SELECT responsibility FROM Responsibility WHERE internshipID = ?",
          [internship.id]
        );

        for (let res2 of result) {
          if (res2.id === internship.id) {
            res2.responsibilities = [];
            for (const respo of res) {
              res2.responsibilities.push(respo.responsibility);
            }
          }
        }
      }
    }

    //   [result] = await pool.query(`
    //   SELECT
    //     Internship.internshipID AS id,
    //     User.profilePic,
    //     Internship.location,
    //     Internship.companyID,
    //     Internship.description,
    //     Internship.title,
    //     Internship.workArrangement,
    //     Internship.worktime AS workTime,
    //     user.description AS companyDescription,
    //     company.industry AS companyType,
    //     CONCAT(CAST(minSalary AS UNSIGNED), '-', CAST(maxSalary AS UNSIGNED), 'DT') AS salary,
    //     Internship.status,
    //     Company.companyName,
    //     Company.website,
    //     CONCAT(workDayStart, '-', workDayEnd) AS workingDays
    //   FROM Internship
    //   JOIN Company ON Internship.companyID = Company.companyID
    //   JOIN User ON User.userID = Internship.companyID
    //   ${filterWhere} ORDER BY postedDate DESC
    // `);

    //   for (const internship of result) {
    //     const [res] = await pool.query(
    //       "SELECT responsibility FROM Responsibility WHERE internshipID = ?",
    //       [internship.id]
    //     );

    //     for (let res2 of result) {
    //       if (res2.id === internship.id) {
    //         res2.responsibilities = [];
    //         for (const respo of res) {
    //           res2.responsibilities.push(respo.responsibility);
    //         }
    //       }
    //     }
    //   }

    let combined = [];
    if (search !== undefined && !isAllUndefined) {
      combined = result.filter((obj1) =>
        result1.some((obj2) => obj2.id === obj1.id)
      );
    } else {
      combined = [...result1, ...result].reduce((acc, obj) => {
        // Check if an object with the same 'id' already exists in the accumulator
        if (!acc.find((item) => item.id === obj.id)) {
          acc.push(obj);
        }
        return acc;
      }, []);
    }

    const total = combined.length;
    const pages = Math.ceil(total / 4);
    const index = offset * 4;

    return {
      internships: combined.slice(index, index + 4),
      totalPages: pages,
      totalResults: total,
    };
  }
}
