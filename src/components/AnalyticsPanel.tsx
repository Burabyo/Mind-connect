import React, { useEffect, useState } from "react";
import api from "../api/client";

export default function AnalyticsPanel() {
  const [trending, setTrending] = useState<Array<{ issue: string; count: number }>>([]);
  const [highRiskCount, setHighRiskCount] = useState(0);
  const [checkInAggregates, setCheckInAggregates] = useState<{ weekly: number }>({ weekly: 0 });

  useEffect(() => {
    api.get("/analytics/trending").then(r => setTrending(r.data || []));
    api.get("/analytics/high-risk-count").then(r => setHighRiskCount(r.data.count || 0));
    api.get("/analytics/checkins").then(r => setCheckInAggregates(r.data || { weekly: 0 }));
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3">Analytics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 border rounded">
          <div className="text-sm">High-risk flags</div>
          <div className="text-2xl font-bold">{highRiskCount}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm">Weekly check-ins</div>
          <div className="text-2xl font-bold">{checkInAggregates.weekly}</div>
        </div>
        <div className="p-3 border rounded col-span-3">
          <div className="text-sm mb-2">Trending issues</div>
          <ul className="space-y-1">
            {trending.map(t => <li key={t.issue} className="flex justify-between"><span>{t.issue}</span><span>{t.count}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
