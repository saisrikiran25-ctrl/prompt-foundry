import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Catalog } from './pages/Catalog';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Checkout } from './pages/Checkout';
import { HelpCenter } from './pages/HelpCenter';
import { RequestPrompt } from './pages/RequestPrompt';
import { TermsOfService } from './pages/TermsOfService';
import { About } from './pages/About';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/about" element={<About />} />
                
                {/* Cart is public (guests can add items), but Checkout is protected */}
                <Route path="/cart" element={<Cart />} />
                
                {/* Protected Routes - Strict Authentication Required */}
                <Route path="/catalog" element={
                  <ProtectedRoute>
                    <Catalog />
                  </ProtectedRoute>
                } />
                <Route path="/product/:id" element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/request-prompt" element={
                  <ProtectedRoute>
                    <RequestPrompt />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;