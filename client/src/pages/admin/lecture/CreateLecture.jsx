import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [lectureTitle, setLectureTitle] = useState("");

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lecture,
    isLoading: lectureLoading,
    error: lectureError,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture created successfully");
    }

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, data, error, courseId]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Add New Lecture</h1>
        <p className="text-sm">
          Fill in the details below to create a new lecture.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Lecture name"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/courses/${courseId}`)}
          >
            Back
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        <div className="mt-10">
          {lectureLoading ? (
            <LoadingSpinner />
          ) : lectureError ? (
            <p>Failed to load lectures.</p>
          ) : lecture?.lectures?.length === 0 ? (
            <p>No lectures found for this course.</p>
          ) : (
            lecture?.lectures?.map((lecture, index) => (
              <Lecture key={lecture._id} lecture={lecture} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
