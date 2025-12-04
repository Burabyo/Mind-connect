import React, { useEffect, useState } from "react";
import api from "../../api/client";

export default function PrivacyControls() {
  const [retentionDays, setRetentionDays] = useState<number>(90);
  const [anonymize, setAnonymize] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/admin/privacy").then(r => {
      const d = r.data;
      setRetentionDays(d.retentionDays ?? 90);
      setAnonymize(d.anonymize ?? true);
    }).catch(() => {});
  }, []);

  async function save() {
    setSaving(true);
    try {
      await api.post("/admin/privacy", { retentionDays, anonymize });
      alert("Privacy settings saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-4 border rounded max-w-xl">
      <label className="block mb-2">Retention window (days)</label>
      <input type="number" value={retentionDays} onChange={(e) => setRetentionDays(Number(e.target.value))} className="border p-2 rounded w-40" />
      <div className="mt-3">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={anonymize} onChange={(e) => setAnonymize(e.target.checked)} />
          <span>Anonymize student identifiers</span>
        </label>
      </div>
      <div className="mt-3">
        <button onClick={save} disabled={saving} className="px-3 py-2 rounded bg-slate-800 text-white">
          {saving ? "Saving…" : "Save privacy settings"}
        </button>
      </div>
    </div>
  );
}
