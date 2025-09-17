import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import EventDetail from "./pages/EventDetail.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/eventDetail/:eventId", element: <EventDetail /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
