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
        loader: () => fetch("http://localhost:3000/items"),
      },
      {
        path: "/equipments",
        element: (
          <PrivateRoute>
            <Equipments></Equipments>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/items"),
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

        loader: ({ params }) =>
          fetch(`http://localhost:3000/items/${params.id}`),
      },
      {
        path: "/details/:id",
        element: <Details></Details>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/items/${params.id}`);
          const data = await res.json();
          return data;
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
