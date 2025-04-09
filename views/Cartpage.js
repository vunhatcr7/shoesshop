import React, { useState } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../data/CartContext";
import Logo from "../assets/img/logo1.png"
export default function CartPage() {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Tính tổng tiền
    const totalAmount = cartItems.length > 0 
        ? cartItems.reduce((total, product) => total + product.price * product.quantity, 0)
        : 0;

    const handleSearch = () => {
        alert(`Searching for: ${searchQuery}`);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }

        const newOrder = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            items: cartItems,
            total: totalAmount,
        };

        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...storedOrders, newOrder]));

        alert("Đơn hàng đã được lưu!");
        navigate("/checkout");
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <img src={Logo} alt="Logo" className="ml-10 h-20 " />
                <nav className="flex space-x-6 text-lg font-semibold relative">
                    <Link to="/home" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">Home</Link>
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-600 hover:text-blue-500 px-2 transition duration-300">Product</button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-50">
                                    <Link to="/productMen" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">Men</Link>
                                    <Link to="/productWomen" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">Women</Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Link to="/about" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">About</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">Contact</Link>
                </nav>
                <div className="flex space-x-4">
                    <input type="text" placeholder="Search for shoes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700" onClick={handleSearch}><FaSearch /></button>
                    <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"><FaShoppingCart size={20} /></button>
                    <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"><FaUser size={20} /></button>
                </div>
            </nav>

            {/* Cart Content */}
            <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl text-center mt-5 font-bold text-gray-900 mb-6">Giỏ hàng của bạn</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="mt-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className=" md:col-span-2 bg-white p-4 shadow-md rounded-lg">
                        {cartItems.map((product, index) => (
                            <div key={index} className="grid grid-cols-3 items-center justify-between border-b pb-4 mb-4">
                                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
                                <div>
                                    <h2 className="text-lg font-semibold">{product.name}</h2>
                                    <p className="text-gray-500">{product.price.toLocaleString()}$</p>
                                    <div className=" display: flex align-items: center  gap-4">
                                        <button 
                                            className="w-7 h-7 display:flex align-items:center justify-content:center bg-gray-300 rounded-lg border-radius-2 cursor:pointer"
                                            onClick={() => decreaseQuantity(product.id)}
                                        > - </button>
                                        <p className=" align-items: center  text-lg font-semibold">{product.quantity}</p>
                                        <button 
                                            className="w-7 h-7 display:flex align-items:center justify-content:center bg-gray-300 rounded-lg border-radius-2 cursor:pointer"
                                            onClick={() => increaseQuantity(product.id)}
                                        > + </button>
                                    </div>
                                </div>
                                <button 
                                    className=" flex justify-self-end gap-6 mr-20  ml-20 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="px-10 bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
                        <div className="flex justify-between">
                            <p>Tổng cộng:</p>
                            <p className="font-semibold">{totalAmount.toLocaleString()}$</p>
                        </div>
                        {/* <button className="" */}
                        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                                onClick={() => navigate("/checkout")}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
            <Link to="/home" className="block font-semibold text-center text-indigo-600 mt-6 hover:underline">
                Tiếp tục mua sắm
            </Link>
        </div>
        </>
    );
}
