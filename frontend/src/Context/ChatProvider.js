import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    // Only redirect unauthenticated users when they try to access protected routes
    const isProtectedRoute = window.location.pathname.startsWith("/chats");
    if (!userInfo && isProtectedRoute) {
      history.replace("/auth");
    }
  }, [history]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        setSelectedChat,
        selectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
