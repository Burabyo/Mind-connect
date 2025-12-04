export type SessionStatus = "queued" | "active" | "closed";
export type Session = {
  id: string;
  studentId: string; // use anonymized id if requested
  startAt?: string;
  endAt?: string | null;
  status: SessionStatus;
  reason?: string;
  notes?: string;
  resources?: Array<{ id: string; title: string; url: string }>;
  highRisk?: boolean;
};

export type ChatMessage = {
  id: string;
  sessionId?: string | null;
  from: "student" | "counselor" | "system";
  text: string;
  createdAt: string;
};
