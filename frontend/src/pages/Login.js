import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container py-5">
      <form className="create-form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input type="email" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <input type="password" placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})} required />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
