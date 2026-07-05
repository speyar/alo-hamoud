"use client";

import { useEffect, useState } from "react";

const connect = () => {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const ws = new WebSocket(`ws://${location.host}/api/ws`);
  return ws;
};

export default function Home() {
  const [playersConnected, setPlayersConnected] = useState<string[]>([]);
  useEffect(() => {
    const uniqueId = crypto.randomUUID();
    const ws = connect();
    ws.addEventListener("open", () => {
      console.log("WebSocket connection established");
      ws.send(uniqueId);
    });
    ws.addEventListener("message", async (event) => {
      const text = await event.data.text();
      setPlayersConnected((prev) => [...prev, text]);
    });
    return () => ws.close();
  }, []);
  return (
    <div>
      <ul>
        {playersConnected.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </div>
  );
}
