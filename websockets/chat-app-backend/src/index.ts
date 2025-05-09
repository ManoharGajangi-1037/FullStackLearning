import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
interface User {
  socket: WebSocket;
  roomId: String;
}
let allSockets: User[] = [];
wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const message_body = JSON.parse(message.toString());
    if (message_body.type == "join") {
      console.log("user logged");
      allSockets.push({
        socket: socket,
        roomId: message_body.payload.roomId,
      });
    }
    if (message_body.type == "chat") {
      const current_user: any = allSockets.find((x) => x.socket == socket);
      allSockets.forEach((x) => {
        if (x.roomId == current_user.roomId && x.socket != current_user.socket) {
          x.socket.send(
            JSON.stringify({
              type: "chat",
              payload: {
                message: message_body.payload.message,
              },
              sentBy: "server",
            })
          );
        }
      });
    }
  });
});
