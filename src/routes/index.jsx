import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import VehicleModels from "../pages/VehicleModels";
import { VehicleModelCreate } from "../pages/VehicleModelCreate";
import { VehicleModelEdit } from "../pages/VehicleModelEdit";
import { VehicleMakeCreate } from "../pages/VehicleMakeCreate";
import { VehicleMakeEdit } from "../pages/VehicleMakeEdit";
import Home from "../pages/Home";

export const ROUTES = {
  HOME: "/",
  VEHICLE_MODEL: "/models/:id",
  VEHICLE_EDIT_BRAND: "/brand/:id",
  VEHICLE_EDIT_MODEL: "/model/:id",
  VEHICLE_CREATE: "/create-brand",
  VEHICLE_CREATE_MODEL: "/create-model",
  NOT_FOUND: "*",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    exact: true,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.VEHICLE_CREATE,
        element: <VehicleMakeCreate />,
      },

      {
        path: ROUTES.VEHICLE_EDIT_BRAND,
        element: <VehicleMakeEdit />,
      },
      {
        path: ROUTES.VEHICLE_MODEL,
        element: <VehicleModels />,
      },
      {
        path: ROUTES.VEHICLE_CREATE_MODEL,
        element: <VehicleModelCreate />,
      },
      {
        path: ROUTES.VEHICLE_EDIT_MODEL,
        element: <VehicleModelEdit />,
      },
    ],
  },

  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.HOME} />,
  },
]);
