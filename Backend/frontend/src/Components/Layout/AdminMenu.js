import React from "react";
import { Link } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <h1>Dashboard</h1>
        <ul className="list-group">
          <li className="list-group-item ">
            <Link
              style={{ textDecoration: "none", color: "#464646" }}
              to="/dashboard/admin/create-category"
            >
              Create a Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              style={{ textDecoration: "none", color: "#464646" }}
              to="/dashboard/admin/create-product"
            >
              Create a Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              style={{ textDecoration: "none", color: "#464646" }}
              to="/dashboard/admin/products"
            >
              Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              style={{ textDecoration: "none", color: "#464646" }}
              to="/dashboard/admin/users"
            >
              Users
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
