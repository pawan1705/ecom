import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 500);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
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
