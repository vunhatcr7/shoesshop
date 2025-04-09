import LoginPage from './views/Loginpage';
import './App.css';
import RegisterPage from './views/Registerpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPass from './views/resetPassword';
import HomePage from './views/Homepage';
import ProductMen from './views/ProductMen';
import CartPage from './views/Cartpage';
import ProfilePage from './views/Profilepage';
import OrderHistoryPage from './views/OrderHistory';
import ProductDetailPage from './views/ProductDetails';
import ProductWomen from './views/ProductWomen';
import { CartProvider } from './data/CartContext';
import CheckoutPage from './views/Checkout';
import AdminDashboard from './admin/AdminDashboard.js';
import LoginAdmin from './admin/LoginAdmin.js';
import ManageProducts from './admin/ManageProducts.js'
import Userprofile from './admin/UserProfile.js';
import UserPage from './admin/UserPages.js';
import SearchBar from './component/SearchBar.js';
function App() {
  return (
    <>
      <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/productmen" element={<ProductMen />} />
          <Route path="/productwomen" element={<ProductWomen />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/ordered" element={<OrderHistoryPage />} /> */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/product" element={<ManageProducts />} />
          <Route path='/admin/profile' element={<Userprofile/>} />
          <Route path='/admin/users' element={<UserPage/>} />
          {/* <Route path='/v' element={<UserPage/>} /> */}
        </Routes>
      </Router>
      </CartProvider>
    </>
  );
}

export default App;
