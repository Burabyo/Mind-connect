import React from "react";
import AnalyticsPanel from "../../components/AnalyticsPanel";
import PrivacyControls from "./PrivacyControls";
import api from "../../api/client";

export default function AdminDashboard() {
  async function exportData() {
    // Example: GET /admin/export -> returns csv
    const res = await api.get("/admin/export", { responseType: "blob" });
    const blob = new Blob([res.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Portal</h1>
      <div className="flex gap-3">
        <button onClick={exportData} className="px-4 py-2 rounded bg-slate-800 text-white">Export Data</button>
      </div>

      <AnalyticsPanel />

      <div>
        <h2 className="text-xl font-semibold mt-4">Privacy & Resource Management</h2>
        <PrivacyControls />
      </div>
    </div>
  );
}
