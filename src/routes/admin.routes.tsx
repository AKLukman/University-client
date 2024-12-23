import AacademicDepartment from "../pages/admin/academicManagement/AacademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAacademicDepartment from "../pages/admin/academicManagement/CreateAacademicDepartment";
import CreateAacademicSemester from "../pages/admin/academicManagement/CreateAacademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    name: "Academic management",
    children: [
      {
        name: "Create A. Semesters",
        path: "create-academic-semester",
        element: <CreateAacademicSemester></CreateAacademicSemester>,
      },

      {
        name: "A. Semesters",
        path: "academic-semester",
        element: <AcademicSemester></AcademicSemester>,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty></CreateAcademicFaculty>,
      },
      {
        name: "A. Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty></AcademicFaculty>,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAacademicDepartment></CreateAacademicDepartment>,
      },
      {
        name: "A. Department",
        path: "academic-department",
        element: <AacademicDepartment></AacademicDepartment>,
      },
    ],
  },

  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
      {
        name: "Create Faculty",
        path: "create-Faculty",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent></CreateStudent>,
      },
      {
        name: "Student",
        path: "student-data",
        element: <StudentData></StudentData>,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails></StudentDetails>,
      },
    ],
  },
];
