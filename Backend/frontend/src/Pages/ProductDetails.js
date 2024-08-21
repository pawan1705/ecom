import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [product, setProduct] = useState({});
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`
      );
      setProduct(data?.product);
      getRelatedProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/similar-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
            className="card-img-top mt-2 "
            style={{
              height: "300px",
              width: "350px",
              textAlign: "center",
            }}
            alt={product.name}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h5>Name : {product.name}</h5>
          <h5>Description : {product.description}</h5>
          <h5>Price : {product.price}</h5>
          <h5>Category : {product.category?.name}</h5>
          <button className="btn btn-info m-2">Add to cart</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h4 className="text-center">similar products :-</h4>
        {relatedProduct.length < 1 && <p>No similar product Found</p>}
        {relatedProduct?.map((p) => (
          <div className="col ">
            <div className="card m-2   p-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:8080/api/v1/product/get-product-image/${p._id}`}
                className="card-img-top mt-2 "
                style={{
                  height: "150px",
                  width: "150px",
                  textAlign: "center",
                }}
                alt={p.name}
              />
              <div className="card-body">
                <h3 className="card-title">{p.price}₹</h3>
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 50)}...</p>
                <button className="btn btn-info m-2">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
