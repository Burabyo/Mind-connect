import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/client";
import { Session } from "../../types";

export default function SessionView() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/sessions/${id}`)
      .then((r) => {
        setSession(r.data);
        setNotes(r.data?.notes || "");
      })
      .catch(console.error);
  }, [id]);

  async function saveNotes() {
    if (!session) return;
    setSaving(true);
    try {
      await api.patch(`/sessions/${session.id}`, { notes });
      setSession({ ...session, notes });
    } catch (err) {
      console.error(err);
      alert("Failed to save notes.");
    } finally {
      setSaving(false);
    }
  }

  async function escalate() {
    // TODO: backend: POST /sessions/:id/escalate
    if (!session) return;
    try {
      await api.post(`/sessions/${session.id}/escalate`);
      alert("Escalation requested.");
    } catch (err) {
      console.error(err);
      alert("Failed to escalate.");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">Session</h2>
      {!session ? <p>Loading session…</p> : (
        <>
          <div className="mb-4">
            <div>Student ID: <span className="font-medium">{session.studentId}</span></div>
            <div>Status: <span className="font-medium">{session.status}</span></div>
            <div>High risk: <span className="font-medium">{session.highRisk ? "Yes" : "No"}</span></div>
          </div>

          <label className="block mb-2">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded h-32" />

          <div className="flex gap-2 mt-3">
            <button onClick={saveNotes} disabled={saving} className="px-4 py-2 rounded bg-slate-800 text-white">
              {saving ? "Saving…" : "Save Notes"}
            </button>
            <button onClick={escalate} className="px-4 py-2 rounded border">Escalate</button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-2">
              {(session.resources || []).map(r => (
                <li key={r.id}><a href={r.url} target="_blank" rel="noreferrer" className="text-blue-600">{r.title}</a></li>
              ))}
            </ul>
            <div className="mt-2">
              <button className="px-3 py-1 border rounded">Attach resource (TODO)</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
