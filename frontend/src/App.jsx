import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import SpotPage from "./pages/SpotPage";
import MyProfile from "./pages/MyProfile";
import SearchPage from "./pages/SearchPage";
import ModifyProfile from "./pages/ModifyProfile";
import AddSession from "./pages/AddSession";
import MySessions from "./pages/MySessions";
import MyMapVisited from "./pages/MyMapVisited";
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
          path="/spots/:id"
          element={<SpotPage open={open} setOpen={setOpen} />}
        />
        <Route
          path="/myprofile"
          element={<MyProfile open={open} setOpen={setOpen} />}
        />
        <Route
          path="/modify-profile"
          element={<ModifyProfile open={open} setOpen={setOpen} />}
        />
        <Route
          path="/myspots"
          element={<MyMapVisited open={open} setOpen={setOpen} />}
        />
        <Route
          path="/add-session"
          element={<AddSession open={open} setOpen={setOpen} />}
        />
        <Route
          path="/my-sessions"
          element={<MySessions open={open} setOpen={setOpen} />}
        />
      </Routes>
    </div>
  );
}

export default App;
