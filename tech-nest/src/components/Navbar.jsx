import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaListAlt,
  FaHome,
  FaShoppingCart,
  FaStore,
  FaMicrochip,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { Bell } from "lucide-react";
import { useNotifications } from "../context/NotificationsContext";
import { useAuth } from "../context/AuthContext";

const CartIconWithBadge = ({ cartItems }) => (
  <div className="relative">
    <FaShoppingCart size={20} />
    {cartItems.length > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
        {cartItems.length}
      </span>
    )}
  </div>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsSeen, setNotificationsSeen] = useState(false);
  const { cartItems } = useCart();
  const { messages, removeMessage } = useNotifications();
  const { user } = useAuth();

  const desktopNotificationsRef = useRef(null);
  const mobileNotificationsRef = useRef(null);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (showNotifications) {
      setNotificationsSeen(true);
    }
  }, [showNotifications]);

  useEffect(() => {
    if (messages.length > 0) {
      setNotificationsSeen(false);
    }
  }, [messages]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (desktopNotificationsRef.current && !desktopNotificationsRef.current.contains(event.target)) &&
        (mobileNotificationsRef.current && !mobileNotificationsRef.current.contains(event.target))
      ) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 flex items-center gap-1 font-semibold border-b-2 border-indigo-600 transition duration-200 justify-center md:justify-start cursor-pointer"
      : "hover:text-indigo-600 flex items-center gap-1 transition duration-200 justify-center md:justify-start cursor-pointer";

  const notificationButtonClass = showNotifications
    ? "text-indigo-600 flex items-center gap-1 font-semibold border-b-2 border-indigo-600 transition duration-200 justify-center md:justify-start cursor-pointer px-2 py-1 rounded"
    : "hover:text-indigo-600 flex items-center gap-1 transition duration-200 justify-center md:justify-start cursor-pointer px-2 py-1 rounded";

  return (
    <nav className="bg-purple-800/30 backdrop-blur-md border-b border-gray-300 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          aria-label="TechNest Home"
          className="text-2xl font-bold text-purple-800 flex items-center gap-2"
          onClick={closeMenu}
        >
          <FaMicrochip size={28} />
          TechNest
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg text-gray-800 font-medium items-center">
          <li>
            <NavLink to="/" className={linkClass} onClick={closeMenu}>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={linkClass} onClick={closeMenu}>
              <FaStore />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={linkClass} onClick={closeMenu}>
              <div className="flex items-center gap-1">
                <CartIconWithBadge cartItems={cartItems} />
                Cart
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={linkClass} onClick={closeMenu}>
              <FaListAlt />
              Order History
            </NavLink>
          </li>

          {/* Notifications Desktop */}
          <li className="relative" ref={desktopNotificationsRef}>
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className={notificationButtonClass}
              type="button"
            >
              <div className="relative">
                <Bell className="w-6 h-6" />
                {!notificationsSeen && messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold animate-pulse">
                    {messages.length}
                  </span>
                )}
              </div>
              Notifications
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                <ul>
                  {messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-sm text-gray-800 border-b last:border-none px-4 py-3 hover:bg-indigo-50 transition"
                      >
                        <span>{msg}</span>
                        <button
                          onClick={() => removeMessage(index)}
                          className="text-red-600 hover:text-red-800 font-bold ml-3"
                        >
                          ❌
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm px-4 py-3">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
          onClick={toggleMenu}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 text-center text-gray-800 font-medium bg-white rounded-md shadow-md py-4 max-w-xs mx-auto">
          <li>
            <NavLink to="/" className={linkClass} onClick={closeMenu}>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={linkClass} onClick={closeMenu}>
              <FaStore />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={linkClass} onClick={closeMenu}>
              <div className="flex items-center justify-center gap-1">
                <CartIconWithBadge cartItems={cartItems} />
                Cart
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={linkClass} onClick={closeMenu}>
              <FaListAlt />
              Order History
            </NavLink>
          </li>

          {!user && (
            <Link to="/login" className="text-sm hover:underline">
              Login
            </Link>
          )}

          {/* Notifications Mobile */}
          <li className="relative" ref={mobileNotificationsRef}>
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className={notificationButtonClass + " justify-center mx-auto"}
              type="button"
            >
              <div className="relative">
                <Bell className="w-6 h-6" />
                {!notificationsSeen && messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold animate-pulse">
                    {messages.length}
                  </span>
                )}
              </div>
              Notifications
            </button>

            {showNotifications && (
              <div className="absolute right-0 left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-w-xs mx-auto max-h-64 overflow-y-auto">
                <ul className="text-left">
                  {messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center text-sm text-gray-800 border-b last:border-none px-4 py-3 hover:bg-indigo-50 transition"
                      >
                        <span>{msg}</span>
                        <button
                          onClick={() => removeMessage(index)}
                          className="text-red-600 hover:text-red-800 font-bold ml-3"
                        >
                          ❌
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm px-4 py-3">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
