import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../Hook/useCategory";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={`All Categories`}>
      <h1>All Categories</h1>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
