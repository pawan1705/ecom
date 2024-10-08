import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";
import axios from "axios";
import "../../style/AuthStyle.css";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../context/auth";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setInterval(() => {
          navigate(location.state || "/");
        }, 500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="ECOM - Login">
      <div className="form-container">
        <form>
          <h4 className="title">Login Here...</h4>

          <div className="mb-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p
            type="submit"
            className="text-info mt-2"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password ?
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
