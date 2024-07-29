import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";
import axios from "axios";
import "../../style/AuthStyle.css";
import Layout from "../../Components/Layout/Layout";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/change-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setInterval(() => {
          navigate("/login");
        }, 700);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="ECOM - Forgot Password">
      <div className="form-container">
        <form>
          <h4 className="title">Reset Password</h4>

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
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your Father Birth Year"
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter Your new Password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Change Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
