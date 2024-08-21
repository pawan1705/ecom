import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getCategoryByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      console.log(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getCategoryByCat();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container mt-3">
        <h1>h1</h1>
        <h1 className="text-center">{products} </h1>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
