import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PostData from "./PostData";
import Signup from "./Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/post" element={<PostData />} />
    </Routes>
  );
}

export default App;
