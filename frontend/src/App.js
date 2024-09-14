import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/chats" component={ChatPage} />
        </Switch>
      </div>
    </ChakraProvider>
  );
}

export default App;
