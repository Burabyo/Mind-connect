import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CounselorDashboard from "./pages/counselor/CounselorDashboard";
import SessionView from "./pages/counselor/SessionView";
import AnonymousChatConsole from "./pages/counselor/AnonymousChatConsole";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/counselor" element={<CounselorDashboard />} />
        <Route path="/counselor/session/:id" element={<SessionView />} />
        <Route path="/counselor/chat-queue" element={<AnonymousChatConsole />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Keep existing student routes as-is */}
      </Routes>
    </BrowserRouter>
  );
}
