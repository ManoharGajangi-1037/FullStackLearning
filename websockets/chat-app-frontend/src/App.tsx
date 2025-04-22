import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState(["hin there"]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    if (ws) {
      ws.onopen = () => {
        const data = {
          type: "join",
          payload: {
            roomId: "red",
          },
        };
        ws.send(JSON.stringify(data));
        setSocket(ws);
      };
    }
  }, []);

  const handleSend = () => {
    const data = {
      type: "chat",
      payload: {
        message: "Hello Manohar",
      },
    };

    console.log("ddd", data);
    socket?.send(JSON.stringify(data));
  };
  return (
    <div className="h-screen bg-black fixed w-full flex flex-col">
      <div className="">

      </div>
      <div className="h-[80vh] w-full m-20 bg-white rounded-2xl flex flex-col">
        <div className="messages h-[70vh]">
          {messages.map((m) => (
            <>
              <div className="MessageBox m-2 p-2 h-[50px] w-[500px] bg-blue-400 flex rounded-2xl">
                {m}
              </div>
            </>
          ))}
          <div className="MessageBox m-2 p-2 h-[50px] w-[500px] bg-fuchsia-400 flex rounded-2xl">
            Hii Iam Fine
          </div>
        </div>
        <div className="flex h-[10vh] justify-end">
          <div>
            <input type="text" className="bg-amber-50 w-[50vh] m-2 p-2" />
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
