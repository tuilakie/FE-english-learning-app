import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthLayout } from "../components/layout/AuthLayout";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import Dashboard from "../components/dashboard/Dashboard";
import CoursePage from "../components/courses/CoursePage";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <h1>Not Found</h1>,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/quizzes",
            element: <h1>Quizzes</h1>,
          },
          {
            path: "/profile",
            element: <h1>Profile</h1>,
          },
          {
            path: "/courses/:courseId",
            element: <CoursePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
