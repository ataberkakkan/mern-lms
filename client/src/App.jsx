import { createBrowserRouter } from "react-router-dom";
import Hero from "./pages/student/Hero";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
