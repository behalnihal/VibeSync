import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
function App() {
  return (
    <div className="App">
      <Route path="/" component={LandingPage} exact />
      <Route path="/auth" component={Homepage} />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
