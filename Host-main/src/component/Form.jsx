import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import toast, { Toaster } from 'react-hot-toast';


const Form = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    message: ""
  });

  const formscheme = yup.object().shape({
    name: yup.string().required("Name is required").trim(),
    message: yup.string().required("Message is required").trim(),
    email: yup.string().email("Invalid email").required("Email is required")
  });

  const setdetails = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await formscheme.validate(formdata);
      console.log("Validation Passed:", formdata);

      const serviceId = "service_kd6xl88";
      const templateId = "template_f5u03g8";
      const publicKey = "CV-6k7EpPAlB6qI45";

      const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: formdata.name,
          from_email: formdata.email,
          to_name: "Dhiraj",
          message: formdata.message
        }
      };

      const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      toast.success("Email Sent Successfully:", res.data);
      toast("Thanks to contact us")

      setFormdata({ name: "", email: "", message: "" });
    } catch (error) {
      console.log("Validation Error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
    <Toaster />
      <div className="flex justify-center items-center flex-col gap-2">
       
        <div className="sm:flex gap-2">
          <img src="./image1.avif" alt="img" className="md:w-[40vw] hidden sm:flex sm:w-[50vw]" />
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-grey-100 p-5 rounded-sm bg-green-300">
            <label className="bg-teal-400 rounded-s-full px-3 text-[20px]">Name</label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              placeholder="Your Name"
              className="border border-grey-200 py-2 px-4 rounded-s-full"
              onChange={setdetails}
            />

            <label className="bg-teal-400 rounded-s-full px-3 text-[20px]">Email</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              className="border border-grey-200 py-2 px-4 rounded-s-full"
              placeholder="Your Email"
              onChange={setdetails}
            />

            <label className="bg-teal-400 rounded-s-full px-3 text-[20px]">Message</label>
            <textarea
              name="message"
              placeholder="Write your text"
              className="border border-grey-400 p-3 lg:w-[25vw] lg:h-[20vh]"
              value={formdata.message}
              onChange={setdetails}
            />

            <button type="submit" className="bg-teal-500 rounded-full border-grey-100 px-2.5 text-[20px] cursor-pointer">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
