import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import { router } from "./router/router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { AnimationProvider } from "./context/AnimationProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AnimationProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </AnimationProvider>
  </AuthProvider>
);
