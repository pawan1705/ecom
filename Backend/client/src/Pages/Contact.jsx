import React from "react";
import { MdAttachEmail } from "react-icons/md";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";

import { assets } from "../assets/assets";
import Layout from "../Components/Layout/Layout";
import "./Contact.css";
const Contact = () => {
  return (
    <Layout title={"ECOM Contact-us"} description={"E-Commerce App"}>
      <div className="container">
        <div className="img">
          <img src={assets.contact} alt="" />
        </div>
        <div className="details">
          <p className="heading">Contact us</p>
          <p>
            any query and info about product feel free to call anytime wqe 24*7
            available.
          </p>
          <p>
            <MdAttachEmail />
            :- ecom@service.com
          </p>
          <p>
            <FaPhoneSquareAlt /> :- +91 1234567890
          </p>
          <p>
            <FaHeadphonesAlt /> :- +91 1234567890
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
