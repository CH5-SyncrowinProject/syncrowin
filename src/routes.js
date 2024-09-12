
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import HomePage from "layouts/HomePage"
// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import { Home, Notifications, Password } from "@mui/icons-material";
import EditProfile from "layouts/EditProfile";
import Library from "layouts/library";
import ForgetPassword from "layouts/authentication/forget-password";
import Dashboardhome from "layouts/Dashboardhome";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProjectDetail from "layouts/ProjectDetails";
import Modeling from "layouts/modeling";
import Analysis from "layouts/Analysis";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UserManagement from "layouts/UserManagement";
import ClientManagement from "layouts/ClientManagement";
import ProjectAnalysis from "layouts/ProjectAnalysis";
import TimeSeries from "layouts/Analysis/components/TimeSeries";
import UserDetails from "layouts/UserManagement/Component/UserDetails";
import EditUserDetails from "layouts/UserManagement/Component/EditUserDetails";
import AddLibrary from "layouts/library/Component/AddLibrary/AddLibrary";
import LibraryDetails from "layouts/library/Component/LibraryDetails/LibraryDetails";
import EditLibrary from "layouts/library/Component/EditLibrary/EditLibrary";
import ParentAssete from "layouts/library/ParentAsste";
import Datasource from "layouts/Datasource";
import { AiTwotoneDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

const routes = [

  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <Home size="12px" />,
    component: <HomePage />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboard",
    route: "/dashboard/home",
    icon: <DashboardIcon size="12px" />,
    component: <Dashboardhome />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Datasource",
    key: "datasource",
    route: "/datasource",
    icon: <AiTwotoneDashboard size="12px" />,
    component: <Datasource />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Library",
    key: "library",
    route: "/library",
    icon: <CreditCard size="12px" />,
    component: <Library />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Add Library",
    key: "addlibrary",
    route: "/addlibrary",
    icon: <CreditCard size="12px" />,
    component: <AddLibrary />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Edit Library",
    key: "editlibrary",
    route: "/editlibrary/:assetId",
    icon: <CreditCard size="12px" />,
    component: <EditLibrary />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Add Library",
    key: "libraryDetails",
    route: "/libraryDetails/:assetId",
    icon: <CreditCard size="12px" />,
    component: <LibraryDetails />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Parent Library",
    key: "parentassete",
    route: "/parentassete/:assetId",
    icon: <CreditCard size="12px" />,
    component: <ParentAssete />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboardhome",
    route: "/dashboard",
    icon: <DashboardIcon size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },

  // {
  //   type: "collapse",
  //   name: "Modeling",
  //   key: "modeling",
  //   route: "/modeling",
  //   icon: <Office size="12px" />,
  //   component: <Modeling />,
  //   noCollapse: true,
  // },

  // {
  //   type: "collapse",
  //   name: "System Analysis",
  //   key: "SystemAnalysis",
  //   route: "/SystemAnalysis",
  //   icon: <Cube size="12px" />,
  //   component: <Analysis />,
  //   noCollapse: true,
  // },

  {
    type: "collapse",
    name: "Project Analysis",
    key: "ProjectAnalysis",
    route: "/ProjectAnalysis",
    icon: <Cube size="12px" />,
    component: <ProjectAnalysis />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Time Series",
    key: "TimeSeries",
    route: "/TimeSeries",
    icon: <Cube size="12px" />,
    component: <TimeSeries />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "User management",
    key: "usermanagement",
    route: "/usermanagement",
    icon: <FaUsers size="12px" />,
    component: <UserManagement />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "User Details",
    key: "UserDetails",
    route: "/UserDetails",
    icon: <ManageAccountsIcon size="12px" />,
    component: <UserDetails />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Edit User Details",
    key: "edituserdetails",
    route: "/edituserdetails",
    icon: <ManageAccountsIcon size="12px" />,
    component: <EditUserDetails />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Client management",
    key: "clientmanagement",
    route: "/clientmanagement",
    icon: <ManageAccountsIcon size="12px" />,
    component: <ClientManagement />,
    noCollapse: true,
  },

  // {
  //   type: "collapse",
  //   name: "Optimisation",
  //   key: "optimisation",
  //   route: "/Optimisation",
  //   icon: <Settings size="12px" />,
  //   component: '',
  //   noCollapse: true,
  // },

  {
    type: "collapse",
    name: "editProfile",
    key: "editProfile",
    route: "/editprofile",
    icon: <CustomerSupport size="12px" />,
    component: <EditProfile />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "projectDetail",
    key: "projectDetail",
    route: "/projectDetail",
    icon: <CustomerSupport size="12px" />,
    component: <ProjectDetail />,
    noCollapse: true,
  },

  // {
  //   type: "collapse",
  //   name: "Notification",
  //   key: "notification",
  //   route: "/notification",
  //   icon: <Notifications size="12px" />,
  //   component: <NotificationDropdown />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Forget Password",
    key: "forgetpassword",
    route: "/authentication/forgetpassword",
    icon: <Password size="12px" />,
    component: <ForgetPassword />,
    noCollapse: true,
  },
];

export default routes;
