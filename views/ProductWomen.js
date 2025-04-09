import { FaShoppingCart, FaHeart, FaBars, FaUser } from "react-icons/fa";
import products from "../data/Product";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BannerCarousel from "../component/BannerCarouselforProduct";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../data/CartContext";
import Sidebar from "../component/Sidebarmenu";
import SearchBar from "../component/SearchBar";
import Logo from "../assets/img/logo1.png"
export default function ProductPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const { addToCart, cartCount } = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    
    const [sidebarOpen, setSidebarOpen] =  useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev)
    }
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = search
            ? product.name.toLowerCase().includes(search.toLowerCase())
            : true;

        const matchesCategory = filter === "all" || product.category === filter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <img src={Logo} alt="Logo" className="ml-10 h-20 " />

                <nav className="flex space-x-6 text-lg font-semibold relative">
                    <Link to="/home" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">Home</Link>
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-600 hover:text-blue-500 px-2 transition duration-300">
                            Product
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
                                    <Link to="/productmen" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                                        Men
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Link to="/about" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">About</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">Contact</Link>
                </nav>
                
                <div className="flex space-x-4">
                <SearchBar/>
                    <Link to="/cart" className="relative bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                        <FaShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                   
                    <button
                        className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                        onClick={() => navigate("/profile")}
                    >
                        <FaUser size={20} />
                    </button>
                    <div>
                    <button onClick={toggleSidebar} className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 ">
                            <FaBars size={24} />
                        </button>
                        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
                    </div>
                </div>
              
            </nav>  
            

            {/* Banner */}
            <div>
                <BannerCarousel />
            </div>

            {/* Product Listing */}
            <section className="max-w-6xl mx-auto py-12">
                <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Men's Shoes</h3>

                {/* Bộ lọc sản phẩm */}
                <div className="flex justify-center gap-4 mb-6">
                    <select className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Products</option>
                        <option value="Nike">Nike</option>
                        <option value="Adidas">Adidas</option>
                        <option value="Balenciaga">Balenciaga</option>
                        <option value="New Balance">New Balance</option>
                        <option value="Puma">Puma</option>
                        <option value="Converse">Converse</option>
                    </select>
                    <input
                        type="search"
                        className="px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Danh sách sản phẩm */}
                {loading ? (
                    <div className="flex justify-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl relative"
                                >
                                    {/* Ảnh sản phẩm */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full rounded-md cursor-pointer"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    />

                                    {/* Thông tin sản phẩm */}
                                    <h4 className="mt-2 font-bold text-gray-900">{product.name}</h4>
                                    <p className="text-gray-600">{product.price} $</p>

                                    {/* Màu sắc sản phẩm */}
                                   {/* Màu sắc sản phẩm */}
                                        <div className="flex space-x-2 mt-2">
                                                {product.colors && product.colors.map((color, index) => (
                                         <div
                                             key={index}
                                             className="w-5 h-5 rounded-full border border-gray-500 cursor-pointer"
                                            style={{ backgroundColor: color }}
                                        ></div>
                                         ))}
                                        </div>


                                    {/* Nút Wishlist và Mua hàng */}
                                    <div className="flex justify-between items-center mt-4">
                                        <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                            <FaHeart className="text-gray-700" />
                                        </button>
                                        <button
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No products found.</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
