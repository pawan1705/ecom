import { Link, useNavigate } from "react-router-dom";
import { TbShoppingCartBolt } from "react-icons/tb";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import "./Header.css";
import useCategory from "../../Hook/useCategory";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };
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
          <SearchInput />
          <ul className="option navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link " aria-current="page">
                Home
              </Link>
            </li>
            {/* <li className="nav-item dropdown">
              <Link
                to={"/categories"}
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`/categories`}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link "
                    aria-current="page"
                  >
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/login" className="nav-link " aria-current="page">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown ">
                  <Link
                    to=""
                    className="nav-link dropdown-toggle "
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ color: "	#ffc0cb" }}
                  >
                    {auth?.user?.name}
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item "
                    >
                      Dashboard
                    </Link>
                    <div className="dropdown-divider" />
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="dropdown-item"
                    >
                      Logout
                    </Link>
                  </div>
                </li>
              </>
            )}

            <li className="nav-item ">
              <Badge count={cart?.length}>
                <Link to="/cart" className="nav-link" aria-current="page">
                  {/* Cart */}
                  <FaCartPlus />
                </Link>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
