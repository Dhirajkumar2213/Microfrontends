import { useEffect, useState } from "react";
import { database } from "./firebase.js";
import { ref, push, set, onChildAdded } from "firebase/database";
import toast, { Toaster } from "react-hot-toast";

function Chat() {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const chatListRef = ref(database, "chats"); 

  useEffect(() => {
    
    const storedHost = sessionStorage.getItem("hostData");
    if (storedHost) {
      setUser(JSON.parse(storedHost));
      setIsLoaded(true);
    }

    const handleHostData = (e) => {
      console.log("Received Host Data:", e.detail.host);
      setUser(e.detail.host);

     
      sessionStorage.setItem("hostData", JSON.stringify(e.detail.host));
      setIsLoaded(true);
    };

    window.addEventListener("HostData", handleHostData);

    const unsubscribe = onChildAdded(chatListRef, (data) => {
      setChat((prevChat) => [...prevChat, data.val()]);
    });


    return () => {
      window.removeEventListener("HostData", handleHostData);
      unsubscribe();
    };
  }, []);

 
  if (!isLoaded) return <div>Loading...</div>;

  const send = () => {
    if (!msg.trim()) return;

    const chatRef = push(chatListRef);
    set(chatRef, {
      email: user?.Email || "unknown",
      username: user?.Username || "Guest",
      message: msg,
    });

    setMsg("");
  };

  return (
    <>
      <Toaster />
      <div className="bg-yellow-200 p-3.5 rounded-sm">
        <div className="flex justify-between items-center">
          <h1 className="bg-orange-400 p-2.5 rounded-full font-bold m-3">
            Username: {user?.Username || "Guest"}
          </h1>
          <button
            className="bg-orange-300 hover:text-white hover:bg-blue-500 border border-grey-200 font-bold min-h-[6vh] w-auto px-3 rounded-full cursor-pointer hover:w-[8vw]"
            onClick={() => {
              sessionStorage.removeItem("hostData"); 
              setUser(null);
              toast.success("Logout successfully");
            }}
          >
            Logout
          </button>
        </div>

        {chat.map((c, i) => (
          <div key={i} className={`flex ${c.email === user?.Email ? "justify-end" : ""} m-2 p-3`}>
            <p className={`bg-orange-300 border ${c.email === user?.Email ? "bg-orange-400" : ""} border-black p-3 rounded-full`}>
              <strong>{c.username || "Unknown User"}: </strong>
              <span>{c.message}</span>
            </p>
          </div>
        ))}

        <div className="flex gap-2.5">
          <input
            type="text"
            placeholder="Type a message!"
            className="border border-orange-400 w-full p-2 mt-3"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="px-2 py-0 rounded-full bg-orange-400 cursor-pointer"
            onClick={() => {
              user?.Username ? send() : toast("Please Login to Chat!");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
