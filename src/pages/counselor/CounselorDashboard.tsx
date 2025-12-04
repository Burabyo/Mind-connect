import React, { useEffect, useState } from "react";
import { Session } from "../../types";
import api from "../../api/client";
import { Link } from "react-router-dom";

export default function CounselorDashboard() {
  const [todaySessions, setTodaySessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with real endpoint: GET /counselor/sessions?date=YYYY-MM-DD
    api.get("/counselor/sessions/today")
      .then((res) => setTodaySessions(res.data || []))
      .catch((err) => {
        console.error("load sessions", err);
        setTodaySessions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Today’s schedule</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {todaySessions.map((s) => (
            <li key={s.id} className="p-3 shadow-sm rounded-md flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground">
                  {/** show anonymized id if configured */}
                  Student: <span className="font-medium">{s.studentId}</span>
                </div>
                <div className="text-sm">Reason: {s.reason || "—"}</div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm">{s.status}</span>
                <Link to={`/counselor/session/${s.id}`} className="px-3 py-1 rounded bg-slate-800 text-white text-sm">Open</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <Link to="/counselor/chat-queue" className="px-4 py-2 rounded border">Open Anonymous Chat Console</Link>
      </div>
    </div>
  );
}
