import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 700);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h2 style={{ paddingBottom: "60px" }}>
          Redirecting to you in {count} second
        </h2>
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#992d48", width: "60px", height: "60px" }}
        >
          <span
            className="sr-only"
            style={{
              color: " #096446",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Loading
          </span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
