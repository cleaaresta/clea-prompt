import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import MakeSale from "./pages/MakeSale";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import ReactHooks from "./pages/ReactHooks";
import Users from "./pages/Users";
import MemberPage from "./pages/MemberPage";
import ProductCatalog from "./pages/ProductCatalog";
import NotFound from "./pages/NotFound";
import "./App.css";

const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/shop" element={<ProductCatalog />} />
          <Route
            path="/login"
            element={
              <Suspense
                fallback={
                  <div className="loading-screen">Loading login...</div>
                }
              >
                <AuthLayout>
                  <Login />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense
                fallback={
                  <div className="loading-screen">Loading register...</div>
                }
              >
                <AuthLayout>
                  <Register />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="make-sale" element={<MakeSale />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="customers" element={<Customers />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
              <Route path="react-hooks" element={<ReactHooks />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route path="/member" element={<MemberPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
