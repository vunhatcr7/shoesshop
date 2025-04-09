import { useState } from "react";
import { FaShoppingCart, FaSearch, FaUser, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import products from "../data/Product";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from "react-router-dom";
import BannerCarousel from "../component/BannerCarousel";
import {motion, AnimatePresence} from "framer-motion"
import { useCart } from "../data/CartContext";
import Sidebar from "../component/Sidebarmenu";
import ProductCarousel from "../component/ProductCarousel";
import SearchBar from "../component/SearchBar";
import Logo from "../assets/img/logo1.png"
export default function HomePage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const {cartCount} = useCart();
    // const {addToCart} = useCart();
    
  

    const [sidebarOpen, setSidebarOpen] =  useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev)
    }
   
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )  
    return (
        <div className="min-h-screen bg-gray-100">
                    
            {/* <Sidebar/> */}
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
                <div className="flex space-x-4">
                
                <SearchBar/>
            
              
                    



                    <Link to="/cart" className="relative bg-gray-200 p-2 rounded-lg hover:bg-gray-300 ">
                    <FaShoppingCart size={20}/>
                    {cartCount > 0 &&( 
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0 rounded-full">
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
            {/* {searchQuery ? (
  <div className="max-w-6xl mx-auto py-12">
    <h2 className="text-2xl font-bold text-black mb-6">Search Results</h2>
    {filteredProducts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-indigo-600 font-bold">${product.price}</p>
            <Link to="/product/:id"className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              View Details
            </Link>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No products found for "{searchQuery}"</p>
    )}
  </div>
) : (
  <>
    <BannerCarousel />
    <section className="max-w-6xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-black mb-6">Lasted Deals</h2>
      <ProductCarousel products={products} />
    </section>
  </>
)} */}  
           

            <div>
            <BannerCarousel/>
            </div>

         
            <section className="max-w-6xl mx-auto py-12">
                <h2 className="text-2xl font-bold text-black mb-6">Lasted Deals</h2>
                <ProductCarousel products={filteredProducts} />
                
           
        </section> 
        
    

            {/* Footer */}
            <footer className="bg-white shadow-md p-6 text-center text-gray-600">
                &copy; 2025 ShoeStore. All rights reserved.
            </footer>
        </div>
    );
}
