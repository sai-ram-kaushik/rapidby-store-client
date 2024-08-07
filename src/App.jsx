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
import Navbar from "./components/dashboard/Navbar";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProductsPage from "./pages/dashboard/DashboardProductsPage";
import DashboardCatalog from "./pages/dashboard/DashboardCatalog";
import DashboardOrdersPage from "./pages/dashboard/DashboardOrdersPage";
import DashboardStoreSettings from "./pages/dashboard/DashboardStoreSettings";
import DashboardCustomerSupport from "./pages/dashboard/DashboardCustomerSupport";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/store-admin/dashboard/*"
            element={<ProtectedRoute Component={DashboardComponents} />}
          />

          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home home={data.home} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/store/:storeName" element={<Store />} />
                  <Route
                    path="/store/:storeName/product/:id"
                    element={<SingleProduct />}
                  />
                  <Route
                    path="/store/:storeName/product/:id/cart"
                    element={<Cart />}
                  />
                  <Route
                    path="/store/:storeName/product/:id/payment"
                    element={<Payment />}
                  />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

const DashboardComponents = () => {
  return (
    <DashboardLayout>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/products" element={<DashboardProductsPage />} />
        <Route path="/products/catalogs" element={<DashboardCatalog />} />
        <Route path="/orders" element={<DashboardOrdersPage />} />
        <Route path="/store-settings" element={<DashboardStoreSettings />} />
        <Route
          path="/customer-support"
          element={<DashboardCustomerSupport />}
        />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
