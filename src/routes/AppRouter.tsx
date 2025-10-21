import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
