import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./router/ProtectedRoutes";
import Layout from "./Layout/Layout";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/Home",
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },
      {
        path: "/Products",
        element: (
          <Layout>
            <Products />
          </Layout>
        ),
      },
      {
        path: "/Product",
        element: (
          <Layout>
            <Product />
          </Layout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
