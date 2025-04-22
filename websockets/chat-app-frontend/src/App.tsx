import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState(["hi there"]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    if (ws) {
      console.log("hellooooop--o1", ws);
      setSocket(ws);
      ws.onopen = () => {
        console.log("websocket opened");
        // const data = {
        //   type: "join",
        //   payload: {
        //     roomId: "red",
        //   },
        // };
        // ws?.send(JSON.stringify(data));
      };
    }
  }, []);

  const joinRoom = (roomId: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {

      console.log("opeeee");
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
    const data = {
      type: "chat",
      payload: {
        message: message.toString(),
      },
    };
    socket?.send(JSON.stringify(data));
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
