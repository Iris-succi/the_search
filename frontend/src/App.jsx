import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import SpotPage from "./pages/SpotPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/thesearch"
          element={<SearchPage open={open} setOpen={setOpen} />}
        />
        <Route
          path="/spot"
          element={<SpotPage open={open} setOpen={setOpen} />}
        />
      </Routes>
    </div>
  );
}

export default App;
