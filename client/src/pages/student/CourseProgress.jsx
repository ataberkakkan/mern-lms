import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import {
  CheckCircle,
  CheckCircle2,
  PlayCircle,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const { courseId } = params;

  const { data, isLoading, error } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSucces },
  ] = useCompleteCourseMutation();

  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSucces) {
      toast.success(markCompleteData?.message || "Course completed.");
    }

    if (inCompletedSuccess) {
      toast.success(markInCompleteData?.message || "Course incompleted");
    }
  }, [
    completedSucces,
    markCompleteData,
    inCompletedSuccess,
    markInCompleteData,
  ]);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto p-6">
        <TriangleAlert className="h-40 w-40 text-red-700" />
        <h2 className="text-gray-800 dark:text-gray-300 font-bold text-4xl">
          404
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-semibold mt-2">
          Failed to Fetch Course Details. Please try again later.
        </p>
      </div>
    );
  }

  const { courseDetails, progress, completed } = data.data || {};
  const { courseTitle, lectures } = courseDetails;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  const handleUpdateLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>

        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleUpdateLectureProgress(
                  currentLecture?._id || initialLecture?._id
                )
              }
            />
          </div>

          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture - ${
                lectures.findIndex(
                  (lec) => lec._id === currentLecture?._id || initialLecture._id
                ) + 1
              }`}
              : {currentLecture?.lectureTitle || initialLecture?.lectureTitle}
            </h3>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:borded-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">
            {lectures.length} Lectures
          </h2>

          <div className="flex-1 overflow-y-auto">
            {lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id ||
                  (initialLecture?._id ? "bg-gray-200" : "dark:bg-gray-800")
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500" />
                    ) : (
                      <PlayCircle size={24} />
                    )}
                    <CardTitle className="text-lg font-medium">
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>

                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
