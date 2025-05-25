import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full mb-6">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Looks like you haven't added anything yet. Start shopping now and discover amazing gadgets!
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base font-semibold transition duration-300 shadow-md"
            >
              Go to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Function to handle quantity changes
  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      // If quantity goes to 0 or less, remove the item
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Cart
        </h2>
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    +
                  </button>
                </div>

                
                <p className="text-indigo-600 font-bold mt-2">
                  ${item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right">
          <p className="text-xl font-semibold text-gray-800"
          >Total: ${totalPrice.toFixed(2)}</p>
        </div>
      
      <div className="flex flex-wrap gap-6 mt-4">
      <Link
  to="/checkout"
  className="
    mt-8
    inline-block
    px-8 py-3
    bg-indigo-600 hover:bg-indigo-700
    hover:from-indigo-700 hover:via-indigo-800 hover:to-indigo-900
    text-white
    rounded-2xl
    text-lg
    font-semibold
    shadow-lg
    transition
    duration-300
    transform
    hover:scale-105
    focus:outline-none
    focus:ring-4
    focus:ring-indigo-500/50
    text-center
  "
>
  Proceed to Checkout
</Link>

<Link
  to="/shop"
  className="
    mt-8
   
    inline-block
    px-8 py-3
    bg-indigo-600 hover:bg-indigo-700
    hover:from-indigo-500 hover:via-indigo-600 hover:to-indigo-700
    text-white
    rounded-2xl
    text-lg
    font-semibold
    shadow-md
    transition
    duration-300
    transform
    hover:scale-105
    focus:outline-none
    focus:ring-4
    focus:ring-indigo-400/50
    text-center
  "
>
  Continue Shopping
</Link>
</div>

      </div>
    </div>
  );
}
