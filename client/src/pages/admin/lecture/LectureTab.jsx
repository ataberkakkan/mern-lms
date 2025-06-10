import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:5000/api/v1/media";

const LectureTab = () => {
  const params = useParams();
  const { courseId, lectureId } = params;
  const navigate = useNavigate();

  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();

  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const response = await axios.post(
          `${MEDIA_API}/upload-video`,
          formData,
          {
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );

        if (response.data.success) {
          setUploadVideoInfo({
            videoUrl: response.data.data.url,
            publicId: response.data.data.public_id,
          });
          setBtnDisabled(false);
          toast.success("Video uploaded successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to upload video");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Lecture updated successfully");
      navigate(`/admin/courses/${courseId}/lecture`);
    }

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error, data, courseId, navigate]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
      navigate(`/admin/courses/${courseId}/lecture`);
    }
  }, [removeSuccess, removeData, navigate, courseId]);

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Lecture Information</CardTitle>
          <CardDescription>
            Make changes to your lecture information here. Click save when you
            are done.
          </CardDescription>
        </div>
        <Button
          disbaled={removeLoading}
          variant="destructive"
          onClick={removeLectureHandler}
        >
          {removeLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Remove Lecture"
          )}
        </Button>
      </CardHeader>

      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Lecture Title"
            className="mt-2"
          />
        </div>

        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="mt-2 w-fit"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch checked={isFree} onCheckedChange={setIsFree} id="is-free" />
          <Label htmlFor="is-free">Is this video FREE?</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={mediaProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-5">
          <Button disabled={isLoading} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default LectureTab;
