import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
