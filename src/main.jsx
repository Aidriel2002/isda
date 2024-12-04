import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import FacebookPage from "./pages/facebook/Facebook.jsx";
import RobloxPage from "./pages/roblox/Roblox.jsx";
import App from "./pages/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/facebook" element={<FacebookPage />} />
        <Route path="/roblox" element={<RobloxPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
