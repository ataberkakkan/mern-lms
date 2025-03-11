import { createBrowserRouter } from "react-router-dom";
import Hero from "./pages/student/Hero";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import { RouterProvider } from "react-router";

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
