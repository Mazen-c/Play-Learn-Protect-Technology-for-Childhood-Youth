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
import ChildDashboard from "./Pages/ChildDashboard";
import { useAuth } from "./Components/Context/AuthContext";
import ResetPassword from "./Pages/ResetPassword";
import "./i8ln/i8ln";

const App: React.FC = () => {
  const auth = useAuth();

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!auth.user) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  return (
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
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
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
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <ProtectedRoute>
              <TeacherClassManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/assignments"
          element={
            <ProtectedRoute>
              <TeacherAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/challenges"
          element={
            <ProtectedRoute>
              <TeacherChallenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/students/:id"
          element={
            <ProtectedRoute>
              <TeacherStudentDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/dashboard"
          element={
            <ProtectedRoute>
              <ChildDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
