import { useEffect, useState } from "react";
import "./App.css";

type Message = {
  type: string;
  payload: {
    message: string;
  };
  sentBy: string;
};

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      const parsedMessage: Message = JSON.parse(event.data);
      setMessages((m) => [...m, parsedMessage]);
    };
    if (ws) {
      setSocket(ws);
      ws.onopen = () => {
        console.log("websocket connection opened");
      };
    }
  }, []);

  const joinRoom = (roomId: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const joinMsg = {
        type: "join",
        payload: {
          roomId,
        },
      };
      socket.send(JSON.stringify(joinMsg));
    }
  };
  const handleSend = () => {
    const chatMsg = {
      type: "chat",
      payload: {
        message: message.toString(),
      },
      sentBy: "user",
    };
    setMessages((m) => [...m, chatMsg]);
    socket?.send(JSON.stringify(chatMsg));
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <div className="h-screen bg-black fixed w-full flex flex-col px-20">
      <div className="flex gap-3.5 justify-end mt-8 mr-5 mb-2 ">
        <h1 className="bg-amber-50 p-2 rounded-2xl">Join Room</h1>
        <button
          className="bg-red-500 px-8 rounded-2xl cursor-pointer"
          onClick={() => {
            joinRoom("red");
          }}
        >
          Red
        </button>
        <button
          className="bg-green-400 px-4 rounded-2xl cursor-pointer"
          value={"green"}
          onClick={() => {
            joinRoom("green");
          }}
        >
          Green
        </button>
        <button
          className="bg-yellow-200 p-2 rounded-2xl cursor-pointer"
          value={"yellow"}
          onClick={() => {
            joinRoom("yellow");
          }}
        >
          Yellow
        </button>
      </div>
      <div className="h-[80vh] w-full  bg-white rounded-2xl flex flex-col">
        <div className="messages h-[70vh]">
          {messages &&
            messages.map((m: Message, index) => {
              return (
                <div
                  className={`w-full flex justify-end 
                 ${
                   m.sentBy == "user"
                     ? "flex justify-end"
                     : "flex justify-start"
                 } `}
                >
                  <div
                    key={index}
                    className={`MessageBox m-2 p-5 h-[20px]  flex items-center justify-center
                        ${
                          m.sentBy == "user"
                            ? "bg-green-400 "
                            : "bg-blue-400 justify-end"
                        }
                      rounded-xl`}
                  >
                    {m.payload.message}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex h-[10vh] justify-end">
          <div>
            <input
              type="text"
              className="bg-amber-50 w-[50vh] m-2 p-2"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="bg-blue-200 m-2 rounded-2xl p-2 text-center"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
