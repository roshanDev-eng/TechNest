import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 👇 Import your AuthProvider
import { AuthProvider } from "./context/AuthContext"; // Adjust path if needed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
