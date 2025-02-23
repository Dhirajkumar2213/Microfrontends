import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form from "./component/Form";
import Loginform from "./component/Loginform";
import { useState } from "react";
import toast,{Toaster} from "react-hot-toast"

const Chat = lazy(() => import("chatApp/Chat"));
const Email = lazy(() => import("emailApp/Email"));
export default function App() {
  const [host,setHost]=useState()
  const [login, setLogin] = useState(false);
  const SaveData = () => {
    host?setLogin(true):toast.error("Sing up is required!")
  
    setHost((prevHost) => {
      
      sessionStorage.setItem("hostData", JSON.stringify(prevHost));
  
      const event = new CustomEvent("HostData", {
        detail: { host: prevHost },
      });
      dispatchEvent(event);
  
      console.log("Dispatched Data:", prevHost);
      return prevHost;
    });
  };
  

  return (
    <>
    <Toaster/>
    {login?
    
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-blue-600  p-5 flex justify-around items-center max-h-[4vh]">
            <Link to="/chat" className="hover:font-bold  rounded-full bg-yellow-200 flex px-5">
              Chat
            </Link>
            <Link to="/email" className="hover:font-bold rounded-full bg-yellow-200 flex px-5">
              Email
            </Link>
          <Link to="/contact"> <h1 className="hover:font-bold rounded-full bg-yellow-200 flex px-5">
           Contact
        </h1></Link>
          </nav>
   
          <div className="p-4">
            <Routes>
              <Route
                path="/chat"
                element={
                  <Suspense fallback={<div>Loading Chat...</div>}>
                    <Chat />
                  </Suspense>
                }
              />
              <Route
                path="/email"
                element={
                  <Suspense fallback={<div>Loading Email...</div>}>
                    <Email />
                  </Suspense>
                }
              />
              <Route path="/" element={
                <>
                
              </>}/>
              
              <Route path="/contact" element={<Form />}/>
            </Routes>
            
                
          </div>
        </div>
      </Router>
      
      :<div className="flex flex-col justify-center items-center gap-1">
        <Loginform  setHost={setHost} />
        <button className="bg-blue-500 text-yellow-200 py-2 px-7 rounded-full"  onClick={SaveData}>Next</button>
      </div> 
      }
    </>
  );
}
