import React from "react";
import Layout from "./utils/Layout";
import Home from "./pages/Home";
import data from "./data/landing-page.json";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Store from "./pages/Store";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home home={data.home} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/store"
              element={<ProtectedRoute Component={Store} />}
            />
            <Route
              path="/store/product/:id"
              element={<ProtectedRoute Component={SingleProduct} />}
            />
            <Route
              path="/store/product/cart"
              element={<ProtectedRoute Component={Cart} />}
            />
            <Route
              path="/store/product/payment"
              element={<ProtectedRoute Component={Payment} />}
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
