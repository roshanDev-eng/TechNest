import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import landingImage from "../assets/landing.png.png";

export default function Home() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const fadeSlideLeftStyle = {
    opacity: animate ? 1 : 0,
    transform: animate ? "translateX(0)" : "translateX(-60px)",
    transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
  };

  const fadeSlideRightStyle = {
    opacity: animate ? 1 : 0,
    transform: animate ? "translate(0, 0)" : "translate(80px, -40px)",
    transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
  };

  return (
    <>
      {/* Define pulseGlow animation */}
      <style>{`
        @keyframes pulseGlow {
          0% {
            box-shadow:
              0 0 5px rgba(110, 52, 206, 0.3),
              0 0 10px rgba(110, 52, 206, 0.4),
              0 0 15px rgba(110, 52, 206, 0.2);
          }
          50% {
            box-shadow:
              0 0 10px rgba(110, 52, 206, 0.8),
              0 0 20px rgba(110, 52, 206, 1),
              0 0 30px rgba(110, 52, 206, 0.7);
          }
          100% {
            box-shadow:
              0 0 5px rgba(110, 52, 206, 0.3),
              0 0 10px rgba(110, 52, 206, 0.4),
              0 0 15px rgba(110, 52, 206, 0.2);
          }
        }
      `}</style>

      <section className="relative h-screen flex items-center justify-center px-6 bg-black bg-opacity-50 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-10">
          {/* Text section */}
          <div
            className="flex-1 text-white text-center md:text-left"
            style={fadeSlideLeftStyle}
          >
            <h1 className="text-5xl md:text-6xl font-semibold mb-6">
              Welcome to <span className="text-purple-400">TechNest</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-md mx-auto md:mx-0">
              Discover cutting-edge gadgets made for your tech lifestyle.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg transition duration-300 text-lg font-semibold"
            >
              <FaShoppingBag />
              Shop Now
            </Link>
          </div>

          {/* Diamond-shaped glowing image */}
          <div
            className="flex-1 flex justify-center md:justify-end"
            style={fadeSlideRightStyle}
          >
            <div
              className="w-48 h-48 md:w-64 md:h-64 transform rotate-45 border-4 border-purple-800 shadow-xl"
              style={{ animation: "pulseGlow 2.5s ease-in-out infinite" }}
            >
              <img
                src={landingImage}
                alt="Homepage visual"
                className="w-full h-full object-cover transform -rotate-45 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
