import {
  experimental_upgradeWebSocket,
  type WebSocketData,
} from "@vercel/functions";

const sockets = new Set<WebSocket>();

export async function GET() {
  return experimental_upgradeWebSocket((ws) => {
    sockets.add(ws);
    console.log(sockets);
    ws.on("message", (data: WebSocketData) => {
      const text = data.toString();
      console.log("Message from client:", text);
      sockets.forEach((socket) => {
        socket.send(data);
      });
    });
  });
}
