import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "./CourseCard";
import { useGetPublishedCoursesQuery } from "@/features/api/courseApi";
import { TriangleAlert } from "lucide-react";

const Courses = () => {
  const { data, isLoading, error } = useGetPublishedCoursesQuery();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto p-6">
        <TriangleAlert className="h-40 w-40 text-red-700" />
        <h2 className="text-gray-800 dark:text-gray-300 font-bold text-4xl">
          404
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-semibold mt-2">
          No Courses Found. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};
export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
