import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Payment from "./pages/payment/Payment";
import Order from "./pages/order/Order";
import CheckoutSuccess from "./component/CheckoutSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/payment",
    element: <Payment></Payment>,
  },
  {
    path: "/order",
    element: <Order></Order>,
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccess></CheckoutSuccess>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
