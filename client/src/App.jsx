
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Attendance, Dashboard, HomeLayout, Landing, Login, Logout, Payroll, TimeSheet } from "./pages";
import { ToastContainer, toast } from 'react-toastify';
import Accounts_dashboard from "./pages/Accounts_dashboard";
import Employee_dashboard from "./pages/Employee_dashboard";
import Manager_dashboard from "./pages/Manager_dashboard";
import Hr_dashboard from "./pages/Hr_dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      
      {
        path: "admin_dashboard",
        element: <Dashboard />,
      },
      {
        path: "Accounts_dashboard",
        element: <Accounts_dashboard />,
      },
      {
        path: "Employee_dashboard",
        element: <Employee_dashboard />,
      },
      {
        path: "Manager_dashboard",
        element: <Manager_dashboard />,
      },
      {
        path: "Hr_dashboard",
        element: <Hr_dashboard/>,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "timesheet",
        element: <TimeSheet />,
      },
      {
        path: "payroll_management",
        element: <Payroll />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      }
    
    ],
  },
]);

function App() {


  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer position='top-center' />
    </>
  )
}

export default App
