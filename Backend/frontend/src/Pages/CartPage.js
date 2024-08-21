import React from "react";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  //remove item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">{`Hello ${
              auth?.token && auth?.user?.name
            } `}</h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You have ${cart.length} items in your cart
                 ${auth?.token ? "" : "please Login to checkout"}`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-md-8 ">
            <div className="row ">
              {cart?.map((p) => (
                <div className="row mb-2 card flex-row">
                  <div className="col-md-4">
                    {" "}
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
                  </div>
                  <div className="col-md-4">
                    <h6>{p.name}</h6>
                    <p>{p.description.substring(0, 35)}</p>
                    <h4>₹{p.price}/-</h4>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-center ">
            <h2>card summary</h2>
            <p>Total | checkout | Payment</p>
            <hr />
            <h4>Total :{totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
