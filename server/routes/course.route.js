import express from "express";
import {
  createCourse,
  getCreatorCourses,
  editCourse,
  getCourseById,
} from "../controllers/course.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);

export default router;
