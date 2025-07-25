import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const { courseId } = params;

  return (
    <div>
      <div className="flex items-center mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/courses/${courseId}/lecture`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Edit Your Lecture</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};
export default EditLecture;
