import React from "react";
import { Link } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <h1>Dashboard </h1>
        <ul className="list-group">
          <li className="list-group-item ">
            <Link
              style={{ textDecoration: "none", color: "#464646" }}
              to="/dashboard/user/profile"
            >
              Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              style={{ textDecoration: "none", color: "#464646" }}
              to="/dashboard/user/order"
            >
              Order
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
