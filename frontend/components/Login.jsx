import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post(
      "http://localhost:3000/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
    }
    );
    // console.log(data.message);
    toast.success(data.message)
    localStorage.setItem("JWT", data.token)
    setEmail('')
    setPassword('')
    navigateTo('/')
    } catch (error) {
        // console.log(error.response.data.message)
        toast.error(error.response.data.message)
    }
    
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="lg:w-[50vw] w-screen lg:h-[90vh] max-h-[100vh] h-[100vh] bg-white lg:rounded-2xl relative sign-up">
        <div className="p-10">
          <h1 className="text-xl font-bold">Sign Up</h1>
          <p className="font-semibold">Just a few quick thing to get started</p>
        </div>
        <form action="post" className="px-10"onSubmit={handleRegister}>
          
          <label htmlFor="email" className="m-2 font-semibold">
            Email ID
          </label>
          <br />
          <input
            className="bg-white w-full px-3 py-2 rounded-xl border-1 border-b-gray-500 outline-none m-2"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label htmlFor="password" className="m-2 font-semibold">
            Password
          </label>
          <br />
          <input
            className="bg-white w-full px-3 py-2 rounded-xl border-1 border-b-gray-500 outline-none m-2"
            type="text"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button
            className="bg-black text-white w-full p-3 m-2 rounded-xl font-semibold"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
