import {
  experimental_upgradeWebSocket,
  type WebSocketData,
} from "@vercel/functions";
import { connection } from "next/server";

const sockets = new Set<WebSocket>();
const messages: Array<string> = [];

export async function GET() {
  return experimental_upgradeWebSocket(async (ws) => {
    await connection();
    sockets.add(ws);
    console.log(sockets.size);
    console.log("WebSocket connection opened");
    ws.send(JSON.stringify({ messages }));
    ws.on("message", (data: WebSocketData) => {
      console.log(sockets.size);
      const text = data.toString();
      messages.push(text);
      for (const socket of sockets) {
        socket.send(JSON.stringify({ text }));
      }
    });
  });
}
