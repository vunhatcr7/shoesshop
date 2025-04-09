import { FaShoppingCart, FaSearch, FaUserEdit, FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo1.png"
export default function ProfilePage() {
    const [user, setUser] = useState({
        name: "Nhat Minh",
        email: "nhatminh125@gmail.com",
        avatar: "https://i.pinimg.com/736x/27/26/a3/2726a3a3b9e3c31360257fcfb11a7c93.jpg",
        address: "quận 7, tphcm"
    });
    const [isEditting, setIsEditting] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState("profile");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        setUser({ ...user, isAuthenticated: false });
        toast.success('Logout success!');
        navigate("/");
    };

    const handleSave = () => {
        setUser(editedUser);
        setIsEditting(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedUser({ ...editedUser, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    
        const [orderHistory] = useState([
            {
                id: 1,
                date: "2025-04-05",
                total: 89.99,
                products: [
                    { name: "Nike Air Max", quantity: 1, price: 89.99 },
                ],
            },
            {
                id: 2,
                date: "2025-04-02",
                total: 149.98,
                products: [
                    { name: "Adidas Ultraboost", quantity: 2, price: 74.99 },
                ],
            },
        ]);
    

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <img src={Logo} alt="Logo" className="ml-10 h-20 " />
            <nav className="flex space-x-6 text-lg font-semibold relative">
            <Link to="/home" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">Home</Link>
          
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="text-gray-600 hover:text-blue-500 px-2 transition duration-300"
                        >
                            Product
                            
                        </button>

                        <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.3}}
                            className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-50">
                                <Link to="/productMen" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                                     Men 
                                </Link>
                                <Link to="/productWomen" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                                     Women 
                                </Link>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
               
                
           
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">Admin</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">Contact</Link>
        </nav>
                <div className="flex space-x-4 items-center">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        <FaSearch size={18} />
                    </button>
                    <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300" onClick={() => navigate("/cart")}> <FaShoppingCart size={20} /> </button>
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                            <FaUser size={20} />
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-50"
                                >
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg">
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </nav>
            

            {/* Profile Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl"
            >
               
                
               
                <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">User Profile</h3>
                <div className="flex flex-col items-center">
                    <label className="cursor-pointer">
                        <input 
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            disabled={!isEditting}
                        />
                        <motion.img 
                            src={user.avatar} 
                            alt="Avatar" 
                            className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-500 shadow-md object-cover"
                            whileHover={{ scale: 1.05 }}
                        />
                    </label>
                    {isEditting ? (
                        <div className="w-full">
                            <input type="text" name="name" value={editedUser.name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                            <input type="email" name="email" value={editedUser.email} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                            <input type="text" name="address" value={editedUser.address} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                            <button onClick={handleSave} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">{user.name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-600">{user.address}</p>
                            <button onClick={() => setIsEditting(true)} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center mx-auto">
                                <FaUserEdit className="mr-2" /> Edit Profile
                            </button>
                        </div>
                    )}
                </div>
          

            {/* Order History Section */}
          
            <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">📦 Lịch sử đơn hàng</h1>
                
                {orderHistory.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">Không có đơn hàng nào.</p>
                ) : (
                    <ul className="space-y-4 mt-4">
                        {orderHistory.map((order) => (
                            <li key={order.id} className="border p-4 rounded-lg shadow-md">
                                <p><strong>Ngày:</strong> {order.date}</p>
                                <p><strong>Tổng tiền:</strong> {order.total} $</p>
                                <ul className="ml-4 mt-2">
                                    {order.products.map((product, i) => (
                                        <li key={i}>
                                            {product.name} - {product.quantity} x {product.price} $
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            </motion.div>

            {/* Footer */}
            <footer className="bg-white mt-10 shadow-md p-6 text-center text-gray-600">
                &copy; 2025 ShoeStore. All rights reserved.
            </footer>
        </div>
    );
}
