import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      id: Date.now(),
      customer: formData,
      items: cartItems,
      date: new Date().toLocaleString(),
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      clearCart();
      navigate("/Thankyou");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            required
            onChange={handleInputChange}
          />
          <input
            name="email"
            className="w-full border px-4 py-2 rounded"
            type="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={handleInputChange}
          />
          <input
            name="address"
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Address"
            value={formData.address}
            required
            onChange={handleInputChange}
          />
          <input
            name="phone"
            className="w-full border px-4 py-2 rounded"
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            required
            onChange={handleInputChange}
          />
          <div>
            <label className="mr-4 font-semibold">Payment Method:</label>
            <select
              name="paymentMethod"
              className="border px-4 py-2 rounded"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card (Mock)</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
