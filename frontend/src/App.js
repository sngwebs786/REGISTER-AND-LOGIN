import logo from "./logo.svg";
import "./App.css";
import Signup from "./Pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./Pages/User";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<User />} />
          {/* <Route path="/user" element={<User />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
