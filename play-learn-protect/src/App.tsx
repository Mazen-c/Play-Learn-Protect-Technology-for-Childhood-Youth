import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Dashboard from "./Components/DashBoard/DashBoard";
import Game from "./Pages/Game";
import TeacherDashboard from "./Pages/TeacherDashboard";
import TeacherClassManagement from "./Pages/TeacherClassManagement";
import TeacherAssignments from "./Pages/TeacherAssignments";
import TeacherChallenges from "./Pages/TeacherChallenges";
import TeacherStudentDetail from "./Pages/TeacherStudentDetail";
import CreativeStudio from "./Pages/CreativeStudio";
import "./i8ln/i8ln";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/creative-studio" element={<CreativeStudio />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/classes" element={<TeacherClassManagement />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/challenges" element={<TeacherChallenges />} />
        <Route path="/teacher/students/:id" element={<TeacherStudentDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
