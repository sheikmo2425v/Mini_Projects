import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import L from "./l";
import "./tictoc.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/L" element={<Home />} />
        <Route path="/" element={<L />} />
      </Routes>
    </>
  );
};

export default App;
