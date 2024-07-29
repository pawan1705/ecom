import React, { useState } from "react";
// import "./Register.css";
import "../../style/AuthStyle.css";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
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
    <Layout title="ECOM - Register">
      <div className="form-container">
        <form>
          <h4 className="title">Registration Here...</h4>
          <div className="mb-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Full Name"
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="Enter Your email"
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
          <div className="mb-2">
            <input
              value={phone}
              type="text"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-2">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              placeholder=" Enter Your Address"
              required
            />
          </div>
          <div className="mb-2">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              className="form-control"
              placeholder=" your father birth Year"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Registration
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
