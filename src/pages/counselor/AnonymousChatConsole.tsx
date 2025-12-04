import React, { useEffect, useState } from "react";
import api from "../../api/client";
import { ChatMessage } from "../../types";
import { Link } from "react-router-dom";

export default function AnonymousChatConsole() {
  const [queue, setQueue] = useState<Array<{ sessionId: string; studentId: string }>>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadQueue();
  }, []);

  function loadQueue() {
    // TODO: GET /chat/queue
    api.get("/chat/queue").then((r) => setQueue(r.data || [])).catch(console.error);
  }

  function accept(sessionId: string) {
    // TODO: POST /chat/accept
    setSelectedSession(sessionId);
    api.post(`/chat/${sessionId}/accept`).then(() => {
      loadMessages(sessionId);
      loadQueue();
    }).catch(console.error);
  }

  function loadMessages(sessionId: string) {
    api.get(`/chat/${sessionId}/messages`).then((r) => setMessages(r.data || [])).catch(console.error);
  }

  function send() {
    if (!selectedSession) return;
    const payload = { text: input };
    api.post(`/chat/${selectedSession}/message`, payload)
      .then((r) => {
        setMessages((m) => [...m, r.data]);
        setInput("");
      })
      .catch(console.error);
  }

  function closeSession() {
    if (!selectedSession) return;
    api.post(`/chat/${selectedSession}/close`).then(() => {
      setSelectedSession(null);
      setMessages([]);
      loadQueue();
    }).catch(console.error);
  }

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="col-span-1">
        <h3 className="text-lg font-semibold mb-2">Queued Chats</h3>
        <ul className="space-y-2">
          {queue.map(q => (
            <li key={q.sessionId} className="p-2 border rounded flex justify-between items-center">
              <div>
                <div className="text-sm">Student: <span className="font-medium">{q.studentId}</span></div>
                <div className="text-xs text-muted-foreground">Session {q.sessionId}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => accept(q.sessionId)} className="px-2 py-1 rounded bg-slate-800 text-white text-sm">Accept</button>
                <Link to={`/counselor/session/${q.sessionId}`} className="px-2 py-1 border rounded text-sm">Open</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2">
        {!selectedSession ? <p>Select a queued chat to accept and start.</p> : (
          <div>
            <h3 className="font-semibold mb-2">Chat — session {selectedSession}</h3>
            <div className="border rounded h-96 p-3 overflow-auto bg-white">
              {messages.map(m => (
                <div key={m.id} className={`mb-2 ${m.from === "student" ? "text-left" : "text-right"}`}>
                  <div className="inline-block p-2 rounded max-w-[80%]">{m.text}</div>
                  <div className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Write reply..." />
              <button onClick={send} className="px-4 py-2 rounded bg-slate-800 text-white">Send</button>
              <button onClick={closeSession} className="px-3 py-2 rounded border">Mark Closed</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
