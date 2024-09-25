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
import DashboardReport from "./pages/dashboard/DashboardReport";
import DashboardCustomDesign from "./pages/dashboard/DashboardCustomDesign";
import StoreLogin from "./pages/store/StoreLogin";
import StoreRegister from "./pages/store/StoreRegister";
import DashboardTotalCustomers from "./pages/dashboard/DashboardTotalCustomers";

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
                  {/* <Route path="/store/:storeName" element={<StoreLogin />} />
                  <Route
                    path="/store/:storeName/register"
                    element={<StoreRegister />}
                  />
                  <Route path="/:storeName/store" element={<Store />} />
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
                  /> */}
                </Routes>
              </Layout>
            }
          />

          <Route path="/store/*" element={<StoreComponents />} />
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
        <Route path="/report" element={<DashboardReport />} />
        <Route path="/custom-design" element={<DashboardCustomDesign />} />
        <Route path="/total-customers" element={<DashboardTotalCustomers />} />
      </Routes>
    </DashboardLayout>
  );
};

const StoreComponents = () => {
  return (
    <>
      <Routes>
        <Route path="/:storeName" element={<StoreLogin />} />
        <Route path="/:storeName/register" element={<StoreRegister />} />
        <Route path="/:storeName/store-products" element={<Store />} />
        <Route path="/:storeName/product/:id" element={<SingleProduct />} />
        <Route path="/:storeName/product/:id/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
