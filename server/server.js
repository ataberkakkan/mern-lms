import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

/* ROUTE IMPORTS */
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.route.js";

dotenv.config();
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ROUTES */
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
