import React, { useState } from "react";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const formscheme = yup.object().shape({
  Username: yup.string().required("Username required").trim().min(6),
  Password: yup.string().required("Password required").trim().min(5).max(9),
  Email: yup.string().required("Email required").trim().email()
});

const Login = ({ setUser, setLogin}) => {
  const [formdata, setFormdata] = useState({
    Username: "",
    Email: "",
    Password: ""
  });

  const setdetails = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault(); 

    try {
      let result = await formscheme.validate(formdata);
      setUser(result);
      setLogin(true);
      toast.success("Login successfully");
    } catch (error) {
      toast.error(error.errors[0]); 
    }
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="border border-black rounded-xl p-6 flex flex-col  items-center bg-blue-500">
      <Toaster />
          <h1 className="text-[4vh]">LOGIN</h1>
          <form onSubmit={handlesubmit} className="flex flex-col gap-2"> 
            
            
            <label htmlFor="Username" className="flex flex-col">
              Username
              </label>
              <input
                name="Username"
                value={formdata.Username}
                onChange={setdetails}
                type="text"
                placeholder="Name"
                className="border border-black px-2 rounded-md bg-white"
              />

            <label htmlFor="Email" className="flex flex-col">
              E-mail
              </label>
              <input
                name="Email"
                value={formdata.Email}
                onChange={setdetails}
                type="email"
                placeholder="E-mail"
                className="border border-black px-2 rounded-md bg-white"
              />

            <label htmlFor="Password" className="flex flex-col">
              Password
              </label>
              <input
                name="Password"
                value={formdata.Password}
                onChange={setdetails}
                type="password"
                placeholder="Choose Your Password"
                className="border border-black px-2 rounded-md bg-white"
              />

            <button type="submit" className="bg-yellow-200 px-[10vw] py-1 rounded-xl mt-3 cursor-pointer">
         Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
