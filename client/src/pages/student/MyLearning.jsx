import CourseCard from "./CourseCard";

const courses = [
  {
    id: 1,
    title: "Full Stack Next.js Course",
    instructor: "Ataberk Akkan",
    price: "$139",
    thumbnail: "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Full Stack Next.js Course",
    instructor: "Ataberk Akkan",
    price: "$139",
    thumbnail: "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg",
    level: "Beginner",
  },
];

const MyLearning = () => {
  const isLoading = false;

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl ">My Learning</h1>

      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-800 dark:text-white">
            <h2 className="text-xl font-semibold">No courses found</h2>
            <p className="mt-2">You have not enrolled in any courses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <CourseCard key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
