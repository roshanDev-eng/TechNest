import { createContext, useContext, useState, useEffect } from "react";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  // Load messages from localStorage or start empty
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save messages to localStorage on change
    localStorage.setItem("notifications", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Add this function in your NotificationsContext
const removeNotification = (index) => {
  setMessages((prev) => prev.filter((_, i) => i !== index));
};


  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <NotificationsContext.Provider value={{ messages, addMessage, clearMessages,  removeNotification  }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
