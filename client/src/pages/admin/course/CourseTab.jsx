import RichTextEditor from "@/components/RichTextEditor";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const selectCategory = (value) => {
    setInput({
      ...input,
      category: value,
    });
  };

  const selectLevel = (value) => {
    setInput({
      ...input,
      courseLevel: value,
    });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files[0];

    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Course updated successfully");
      navigate("/admin/courses");
    }

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [data, isSuccess, error, navigate]);

  const isPublished = true;

  return (
    <Card>
      <CardHeader className="flex  flex-row justify-between">
        <div>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Make changes to your course information here. Click save when you
            are done.
          </CardDescription>
        </div>

        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublish" : "Publish"}
          </Button>

          <Button>Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={handleChange}
              placeholder="Course Title"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Sub Title</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={handleChange}
              placeholder="Course Sub Title"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectLevel}>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price (USD)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={handleChange}
                placeholder="Course Price"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label>Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="mt-2 w-fit"
            />
            {previewThumbnail && (
              <img src={previewThumbnail} alt="Preview" className="my-2" />
            )}
          </div>

          <div className="space-x-2">
            <Button
              onClick={() => navigate("/admin/courses")}
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CourseTab;
