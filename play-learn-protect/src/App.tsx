import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Dashboard from "./Components/DashBoard/DashBoard";
import Game from "./Pages/Game";
import TeacherDashboard from "./Pages/TeacherDashboard";
import TeacherClassManagement from "./Pages/TeacherClassManagement";
import TeacherAssignments from "./Pages/TeacherAssignments";
import TeacherChallenges from "./Pages/TeacherChallenges";
import TeacherStudentDetail from "./Pages/TeacherStudentDetail";
import CreativeStudio from "./Pages/CreativeStudio";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ParentClasses from "./Pages/Parent/ParentClasses";
import ManageChildren from "./Pages/Parent/ManageChildren";
import ParentDashboard from "./Pages/Parent/ParentDashboard";
import ChildAssignments from "./Pages/Child/ChildAssignments";
import ChildChallenges from "./Pages/Child/ChildChallenges";
import { useAuth } from "./Components/Context/AuthContext";
import { useTheme } from "./Components/Context/ThemeContext";
import ResetPassword from "./Pages/ResetPassword";
import "./i8ln/i8ln";

const App: React.FC = () => {
  const auth = useAuth();
  const { isDark } = useTheme();

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!auth.user) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  const EducatorOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!auth.user) return <Navigate to="/login" replace />;
    const role = (auth.user.role as string) || "";
    if (role !== "educator" && role !== "teacher") return <Navigate to="/" replace />;
    return <>{children}</>;
  };

  const NonEducatorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!auth.user) return <Navigate to="/login" replace />;
    const role = (auth.user.role as string) || "";
    if (role === "educator" || role === "teacher") return <Navigate to="/" replace />;
    return <>{children}</>;
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <Router>
        {auth.user && <Navbar />}
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              {auth.user?.role === "child" ? (
                <Dashboard />
              ) : (auth.user?.role === "educator" || (auth.user as any)?.role === "teacher") ? (
                <TeacherDashboard />
              ) : (
                <ParentDashboard />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <NonEducatorRoute>
              <Game />
            </NonEducatorRoute>
          }
        />
        <Route
          path="/creative-studio"
          element={
            <ProtectedRoute>
              <CreativeStudio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <EducatorOnlyRoute>
              <TeacherDashboard />
            </EducatorOnlyRoute>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <EducatorOnlyRoute>
              <TeacherClassManagement />
            </EducatorOnlyRoute>
          }
        />
        <Route
          path="/teacher/assignments"
          element={
            <EducatorOnlyRoute>
              <TeacherAssignments />
            </EducatorOnlyRoute>
          }
        />
        <Route
          path="/teacher/challenges"
          element={
            <EducatorOnlyRoute>
              <TeacherChallenges />
            </EducatorOnlyRoute>
          }
        />
        <Route
          path="/teacher/students/:id"
          element={
            <EducatorOnlyRoute>
              <TeacherStudentDetail />
            </EducatorOnlyRoute>
          }
        />
        <Route
          path="/child/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/classes"
          element={
            <ProtectedRoute>
              <ParentClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/manage-children"
          element={
            <ProtectedRoute>
              <ManageChildren />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/assignments"
          element={
            <ProtectedRoute>
              <ChildAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/challenges"
          element={
            <ProtectedRoute>
              <ChildChallenges />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
