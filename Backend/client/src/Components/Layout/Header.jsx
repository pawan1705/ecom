import { Link } from "react-router-dom";
import { TbShoppingCartBolt } from "react-icons/tb";

// import { assets } from "../../assets/assets";
import "./Header.css";
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg  ">
      <h3 className="name1  font-weight-bold">
        {/* <img src={assets.logo} alt="" /> */}
        <TbShoppingCartBolt />
      </h3>

      <div className="container-fluid ">
        <Link to="/" className="name navbar-brand">
          ECOM
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success text-light"
              type="submit"
            >
              Search
            </button>
          </form>
          <ul className="option navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link " aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/pagenotfound"
                className="nav-link "
                aria-current="page"
              >
                Category
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/pagenotfound"
                className="nav-link "
                aria-current="page"
              >
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/pagenotfound"
                className="nav-link "
                aria-current="page"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pagenotfound" className="nav-link" aria-current="page">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
