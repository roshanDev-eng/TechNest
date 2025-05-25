import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders.reverse());
  }, []);

  // Delete handler: removes order from state and localStorage
  function handleDelete(id) {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);

    // Also update localStorage (reverse again to keep the same order)
    localStorage.setItem("orders", JSON.stringify(updatedOrders.slice().reverse()));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-xl p-6 border relative"
            >
              {/* Delete button */}
              <button
                onClick={() => handleDelete(order.id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-900 font-bold"
                aria-label={`Delete order ${order.id}`}
              >
                &#x2716; {/* Unicode cross mark */}
              </button>

              <div className="mb-4">
                <p className="font-semibold">Order Date:</p>
                <p>{order.date}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Customer Info:</p>
                <p>Name: {order.customer.name}</p>
                <p>Email: {order.customer.email}</p>
                <p>Phone: {order.customer.phone}</p>
                <p>Address: {order.customer.address}</p>
                <p>
                  Payment:{" "}
                  {order.customer.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Card"}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Items:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.title} — Qty: {item.quantity} — Rs.{" "}
                      {item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
