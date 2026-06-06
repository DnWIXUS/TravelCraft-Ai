import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { DomesticTravelPage } from "./pages/DomesticTravelPage";
import { InternationalTravelPage } from "./pages/InternationalTravelPage";
import { PackageDetailPage } from "./pages/PackageDetailPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CustomPackagePage } from "./pages/CustomPackagePage";
import { NotFound } from "./pages/NotFound";
import { AdminPage } from "./pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "domestic-travel", Component: DomesticTravelPage },
      { path: "international-travel", Component: InternationalTravelPage },
      { path: "package/:type/:id", Component: PackageDetailPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "custom-package", Component: CustomPackagePage },
      { path: "admin", Component: AdminPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
