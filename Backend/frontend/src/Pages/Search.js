import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title="ECOM - search results">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found : ${values.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-5">
            {values?.results.map((p) => (
              <div className="col">
                <div className="card m-2" style={{ width: "18rem" }}>
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
                    <p className="card-text">
                      {p.description.substring(0, 50)}...
                    </p>
                    <button className="btn btn-secondary">See More</button>
                    <button className="btn btn-info m-2">Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
