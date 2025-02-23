import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Email() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [reply, setReply] = useState("");
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) =>
        setEmails(
          data.map((item) => ({
            id: item.id,
            sender: `User ${item.userId}`,
            subject: item.title,
            body: item.body,
            time: new Date().toLocaleTimeString(),
          }))
        )
      );
  }, []);

  const handleReply = () => {
    if (!reply.trim()) return;
    setResponses([
      ...responses,
      { text: reply, time: new Date().toLocaleTimeString() },
    ]);
    toast.success("Reply sent");
    setReply("");
  };

  return (
    <>
      <Toaster />
      <div className="max-w-4xl mx-auto p-4 shadow-md rounded-lg mt-5 bg-yellow-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 w-full border-r md:border-r-gray-300 p-2">
            <div className="flex  items-center gap-3">
              <img src="/gmail_icon.png" alt="img" />
              <h3 className="text-lg font-semibold mb-2 mt-5">Emails</h3>
            </div>
            <ul className="space-y-2">
              {emails.map((email) => (
                <li
                  key={email.id}
                  className={`p-2 border rounded cursor-pointer hover:bg-blue-400   ${
                    selectedEmail?.id === email.id ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <p className="font-medium">{email.subject}</p>
                  <p className="text-sm text-gray-700 ">From: {email.sender}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-2/3 w-full">
            {selectedEmail ? (
              <>
                <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                <p className="text-gray-700">From: {selectedEmail.sender}</p>
                <p className="text-xs text-gray-600">{selectedEmail.time}</p>
                <p className="mt-4">{selectedEmail.body}</p>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Reply</h3>
                  <textarea
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Write your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    className="mt-2 w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleReply}
                  >
                    Send Reply
                  </button>
                </div>

                {responses.length > 0 && (
                  <div className="mt-4 border-t  pt-3 ">
                    <h3 className="text-lg font-semibold">Your Replies</h3>
                    {responses.map((res, index) => (
                      <div
                        key={index}
                        className="mt-2 py-2 px-4 bg-white rounded-md"
                      >
                        <p>{res.text}</p>
                        <p className="text-xs text-gray-700">{res.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-700">Select an email to read</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
