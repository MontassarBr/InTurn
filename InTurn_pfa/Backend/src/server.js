import dotenv from "dotenv";
import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import CompanyRouter from "./routes/companyRoutes.js";
import StudentRouter from "./routes/studentRoutes.js";
import AuthRouter from "./routes/authRoutes.js";
import InternshipRouter from "./routes/internshipRoutes.js";

dotenv.config(); // LOAD ENV VARIABLES INTO APP

const app = express();

app.use(express.json({ limit: "20mb" })); // AUTO PARSING OF JSON OBJECTS COMMING FROM REQUESTS
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/Companies", CompanyRouter);
app.use("/api/Students", StudentRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/internships", InternshipRouter);

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`server running at port => ${PORT}`);
});
