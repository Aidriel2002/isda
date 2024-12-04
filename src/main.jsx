import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FacebookPage from "./pages/facebook/Facebook.jsx";
import RobloxPage from "./pages/roblox/Roblox.jsx";
import App from "./pages/App.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/facebook", element: <FacebookPage /> },
  { path: "/roblox", element: <RobloxPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
