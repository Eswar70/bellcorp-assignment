import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.token);
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "User already exists");
    }
  };

  return (
    <div className="container py-5">
      <form className="create-form" onSubmit={handleSubmit}>
        <h3>Create Account</h3>
        <input placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})} required />
        <input type="email" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <input type="password" placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})} required />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
