import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthLayout } from "../components/layout/AuthLayout";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import Dashboard from "../components/dashboard/Dashboard";
import CoursePage from "../components/courses/CoursePage";
import LevelList from "../components/courses/LevelList";
import LevelPage from "../components/levels/LevelPage";
import LearningPage from "../components/learning/LearningPage";
import QuizzPage from "../components/quizzes/QuizzPage";
import ErrorPage from "../components/layout/ErrorPage";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
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
            path: "/quizzes/:courseId/",
            element: <QuizzPage />,
          },
          {
            path: "/profile",
            element: <h1>Profile</h1>,
          },
          {
            path: "/learning/:courseId/:levelId",
            element: <LearningPage />,
          },
          {
            path: "/courses/:courseId",
            element: <CoursePage />,
            children: [
              {
                path: "/courses/:courseId",
                element: <LevelList />,
              },
              {
                path: "/courses/:courseId/levels/:levelId",
                element: <LevelPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
