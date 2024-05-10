
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";


function App() {
  console.log(useAuth()?.isLoggedIn)

  return (
    <main>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </main>
  );
}

export default App
