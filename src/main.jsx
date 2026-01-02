import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Equipments from "./Component/Equipments/Equipments.jsx";
import MyEquipList from "./Component/MyEquipList/MyEquipList.jsx";
import Login from "./Component/SignUp/Login.jsx";
import Resister from "./Component/SignUp/Resister.jsx";
import Layout from "./Component/Layout/Layout.jsx";
import AddEquipments from "./Component/AddEquipment/AddEquipments.jsx";
import Update from "./Component/Update/Update.jsx";
import Details from "./Component/Details/Details.jsx";
import Error from "./Component/Errors/Error.jsx";
import AuthProvider from "./Component/AuthContext/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <App></App>,
        loader: async () => {
          const res = await fetch(
            "https://sports-store-server-ivory.vercel.app/items"
          );
          if (!res.ok) {
            throw new Response("Failed to load items", {
              status: res.status,
            });
          }
          return res.json();
        },
      },
      {
        path: "/equipments",
        element: (
          <PrivateRoute>
            <Equipments></Equipments>
          </PrivateRoute>
        ),
        loader: async () => {
          const res = await fetch(
            "https://sports-store-server-ivory.vercel.app/items"
          );
          if (!res.ok) {
            throw new Response("Failed to load items", {
              status: res.status,
            });
          }
          return res.json();
        },
      },
      {
        path: "/equipmetList",
        element: (
          //* <PrivateRoute>*/
          <MyEquipList></MyEquipList>
          /* </PrivateRoute> */
        ),
      },

      {
        path: "/AddEquipments",
        element: (
          <PrivateRoute>
            <AddEquipments></AddEquipments>
          </PrivateRoute>
        ),
      },
      {
        path: "/Login",
        element: <Login></Login>,
      },
      {
        path: "/resister",
        element: <Resister></Resister>,
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <Update></Update>
          </PrivateRoute>
        ),

        loader: async ({ params }) => {
          const res = await fetch(
            `https://sports-store-server-ivory.vercel.app/items/${params.id}`
          );
          if (!res.ok) {
            throw new Response("Failed to load items", {
              status: res.status,
            });
          }
          return res.json();
        },
      },
      {
        path: "/details/:id",
        element: <Details></Details>,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://sports-store-server-ivory.vercel.app/items/${params.id}`
          );
          if (!res.ok) {
            throw new Response("Failed to load items", {
              status: res.status,
            });
          }
          return res.json();
        },
      },
      {
        path: "/error",
        element: <Error></Error>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
