import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;

    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "Course title and category are required",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;

    const courses = await Course.find({ creator: userId });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        message: "No courses found for this creator",
        courses: [],
      });
    }

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;

    const thumbnail = req.file;

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let courseThumbnail = course.courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMedia(publicId);
      }
      const cloudResponse = await uploadMedia(thumbnail.path);
      courseThumbnail = cloudResponse.secure_url;
    }

    const updatedData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail,
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedData,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      course: updatedCourse,
      message: "Course updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to edit course",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle } = req.body;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Lecture title and Course ID are required",
      });
    }

    const lecture = await Lecture.create({
      lectureTitle,
    });

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create lecture",
    });
  }
};
