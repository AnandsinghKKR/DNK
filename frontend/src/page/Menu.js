import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";
import QRCode from "react-qr-code";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  const [isLoading, setIsLoading] = useState(true); // Introduce a loading state

  const productDisplay = productData.find((el) => el._id === filterby);

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };

  useEffect(() => {
    // Simulate an asynchronous fetch of data
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false when the data is available
    }, 2000);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading message
  }

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm  overflow-hidden w-full p-5">
          {productDisplay && productDisplay.image && (
            <img
              src={productDisplay.image}
              className="hover:scale-105 transition-all h-full"
              alt="Product Image"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          {productDisplay && productDisplay.name && (
            <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
              {productDisplay.name}
            </h3>
          )}
          {productDisplay && productDisplay.category && (
            <p className="text-slate-500 font-medium text-2xl">
              {productDisplay.category}
            </p>
          )}
          {productDisplay && productDisplay.price && (
            <p className="font-bold md:text-2xl">
              <span className="text-red-500">₹</span>
              <span>{productDisplay.price}</span>
            </p>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleBuy}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Buy
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Add Cart
            </button>
            <div><QRCode style={{height:"65px"}} value="https://drive.google.com/file/d/1lpikmSZ4OyvDGxQl7RrKH2dseNCg5t50/view?usp=sharing"/></div>
          </div>
          {productDisplay && productDisplay.description && (
            <div>
              <p className="text-slate-600 font-medium">Description :</p>
              <p>{productDisplay.description}</p>
            </div>
          )}
        </div>
      </div>

      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
