import { Internship } from "../models/InternshipModel.js";
import { pool } from "../database.js";

export class InternshipController {
  static async fetchLatestInternships(req, res) {
    try {
      const result = await Internship.fetchLatestInternships();
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

  static async getInternship(req, res) {
    try {
      const internshipID = req.params.id;
      const result = await Internship.get(internshipID);
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

  // static async fetchFilteredInternships(req, res) {
  //   try {
  //     let offset = parseInt(req.query.offset) || 0;
  //     let filters = {
  //       title: null,
  //       location: null,
  //       workArrangement: null,
  //       workTime: null,
  //       industry: null,
  //       payment: null,
  //     };

  //     if (req.query.search) filters.title = req.query.search;
  //     if (req.query.location) filters.location = req.query.location;
  //     if (req.query.workArrangement)
  //       filters.workArrangement = req.query.workArrangement;
  //     if (req.query.workTime) filters.workTime = req.query.workTime;
  //     if (req.query.companyType) filters.industry = req.query.companyType;
  //     if (req.query.payment) filters.payment = req.query.payment;
  //     console.log(filters);
  //     const result = await Internship.fetchFilteredInternships(filters, offset);
  //     let { searchQuery, totalCountQuery, params } = result;

  //     Promise.all([
  //       pool.query(searchQuery, params),
  //       pool.query(totalCountQuery, params),
  //     ])
  //       .then(([results1, results2]) => {
  //         let countRow = results2[0]?.[0];
  //         let count = countRow ? countRow.total : 0;
  //         let pages = 0;
  //         if (count) {
  //           const totalresults = count / 4;
  //           pages = Math.ceil(totalresults);
  //         } else {
  //           count = 0;
  //         }
  //         res.status(200).send({
  //           internships: results1[0].filter(
  //             (obj, index, self) =>
  //               index === self.findIndex((o) => o.id === obj.id)
  //           ),
  //           totalPages: count ? pages : 0,
  //           totalResults: count,
  //         });
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ error: err.message });
  //       });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // }

  static async fetchFilteredInternships(req, res) {
    try {
      let offset = parseInt(req.query.offset) || 0;
      let filters = {
        location: req.query.location,
        workArrangement: req.query.workArrangement,
        workTime: req.query.workTime,
        industry: req.query.companyType,
        payment: req.query.payment,
      };

      let searchh = req.query.search;

      // console.log(offset, filters);

      const output = await Internship.fetchInternships(
        filters,
        offset,
        searchh
      );
      res.status(200).send(output);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}
