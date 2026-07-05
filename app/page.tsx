"use client";

import { useEffect, useRef, useState } from "react";

function connect() {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  const ws = new WebSocket(`${protocol}://${location.host}/api/ws`);
  return ws;
}

function sendMessage(message: string, ws: WebSocket) {
  ws.send(message);
}

export default function Home() {
  const wsRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    const ws = connect();
    wsRef.current = ws;
    ws.addEventListener("message", async (event) => {
      const messagesFromServer = event.data;
      const parsed = JSON.parse(messagesFromServer);
      if (parsed.text) {
        setMessages((prevMessages) => [...prevMessages, parsed.text]);
      }
      if (parsed.messages) {
        setMessages(parsed.messages);
      }
    });
    return () => {
      ws.close();
    };
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-2 max-w-[400px]">
        {messages.map((msg, index) => (
          <div key={index} className="border p-2 rounded">
            {msg}
          </div>
        ))}
        <input
          className="border"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => sendMessage(message, wsRef.current!)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
