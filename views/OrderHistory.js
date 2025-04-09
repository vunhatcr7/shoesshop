import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import order from "../data/Order";
import { Link, useNavigate } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion"
import { useCart } from "../data/CartContext";
export default function OrderHistoryPage() {
    const [selectedOrder, setSelectOrder] = useState (order.length > 0 ? order[0] : null);
    const [selectedOrderId,setselectedOrderId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const {cartCount} = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const handleSearch = () => {
        alert(`Searching for: ${searchQuery}`);
    };
    // const orders = [...Array(5)].map((_, i) => ({
    //     id: 1000 + i,
    //     date: `2025-03-2${i}`,
    //     total: 99.99,
    //     status: "In Transit",
    //     details: [
    //         { name: "Sneaker Model X", price: 49.99, qty: 1 },
    //         { name: "Running Shoes", price: 49.99, qty: 1 },
    //     ],
    // }));
    const handleSelectOrder = (orderId) => {
        setselectedOrderId ((prevId) => {
            const newId = prevId === orderId ? null : orderId;
            setSelectOrder(order.find((o) => o.id === newId) || null);
            return newId;
        });
    }
   
        const [orders, setOrders] = useState([]);

        useEffect(() => {
            const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            setOrders(storedOrders);
        }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-indigo-600">ShoeStore</h1>
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
               
                
           
            <Link to="/about" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500 hover:underline transition duration-300">Contact</Link>
        </nav>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search for shoes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                        onClick={handleSearch}
                    >
                        <FaSearch />
                    </button>
                    <Link to="/cart" className="relative bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                    <FaShoppingCart size={20}/>
                    {cartCount > 0 &&( 
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
                </div>
            </nav>

            {/* Order History Section */}
            <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Lịch sử mua hàng</h2>

            <div className="space-y-4">
                {order.map((order) => (
                <div 
                    key={order.id}
                    className="p-4 border rounded-lg hover:shadow-md transition cursor-pointer"

                    >
                    <h3 className="text-lg font-semibold"> Mã đơn hàng: {order.id}</h3>
                    <p>Ngày đặt hàng: {order.date}</p>
                    <p>Trạng thái: <span className="text-blue-500">{order.status}</span></p>
                    <p className="font-semibold">Tổng tiền: {order.total}</p>
                    <button
                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex products-center mx-auto" 
                    onClick={() => handleSelectOrder(order.id)}
                    > 
                    {selectedOrderId === order.id ? "Ẩn chi tiết" : "Xem chi tiết" }
                    </button>                     
                </div>
             ))}

            </div>
            
            {selectedOrder &&(
                <div className="mt-6 p-4 border rounded-lg bg-gray-100">
                    <h3 className="text-xl font-semibold">Chi tiết đơn hàng: {selectedOrder.id}</h3>
                    <p> Ngày đặt hàng: {selectedOrder.date }</p>
                    <p> Trạng thái: <span className="text-blue-500">{selectedOrder.status}</span></p>
                    <h4 className="mt-2 font-semibold"> Sản phẩm </h4>
                    <div className="space-y-2">
                        {selectedOrder.products.map((product) => 
                            <div key={product.id} className="flex items-center space-x-4 border p-2 rounded-lg">
                                <img src={product.image} alt={product.name} className="w-16 h-16 rounded" /> 
                                <div>
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-gray-600">{product.price}</p> 

                                </div> 

                            </div>
                        )}   
                    </div> 
                    <p className="font-semibold">Tổng tiền: {selectedOrder.total}</p>
               
                </div>
            )}

        </div>
            

            {/* Footer */}
            <footer className="bg-white shadow-md p-6 text-center text-gray-600">
                &copy; 2025 ShoeStore. All rights reserved.
            </footer>
        </div>
    );
}
