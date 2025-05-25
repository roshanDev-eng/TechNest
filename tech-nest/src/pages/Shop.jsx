import { useState } from "react";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import { toast } from "react-toastify";
import watchImage from "../assets/watch.png.png"; // Make sure the image path is correct

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div className="bg-purple-100 min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        Shop Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            watchImage={watchImage}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, addToCart, watchImage }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 10000) val = 10000;
    setQuantity(val);
  };

  return (
    <div
      className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-lg hover:shadow-indigo-400 transition-shadow duration-300 cursor-pointer"
      style={{
        border: "2px solid #6e34ce",
        boxShadow:
          "0 0 6px rgba(110, 52, 206, 0.25), 0 0 12px rgba(110, 52, 206, 0.3)",
      }}
    >
      <div className="w-40 h-40 bg-indigo-100 flex items-center justify-center rounded-xl mb-3 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
        <img
          src={watchImage}
          alt={product.name}
          className="w-[100%] h-[100%] object-contain rounded-xl"
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
      <p className="text-indigo-700 font-bold text-lg mb-2">${product.price}</p>

      <div className="flex items-center gap-2 mb-3">
        <input
          id={`quantity-${product.id}`}
          type="number"
          min="1"
          max="10000"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center border border-gray-300 rounded-md py-1 focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <button
        onClick={() => {
          addToCart({ ...product, quantity });
          toast.success(`${product.name} added to cart!`);
        }}
        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-md transition duration-300 text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
}
