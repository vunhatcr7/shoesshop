
import { FaShoppingCart, FaSearch, FaUser,FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Products from "../data/Product";
import {motion, AnimatePresence} from "framer-motion"
import { Link } from "react-router-dom";
import { useCart } from "../data/CartContext"; 
import Logo from "../assets/img/logo1.png"
export default function ProductDetailPage() {
   
    const { addToCart, cartCount } = useCart();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = () => {
        alert(`Searching for: ${searchQuery}`);
    };

    const { id } = useParams();
    const reviews = [
        { id: 1, user: "Alice", rating: 5, comment: "Great quality!" },
        { id: 2, user: "Bob", rating: 4, comment: "Very comfortable." },
    ];
    const product = Products.find((p) => p.id === parseInt(id));
    useEffect(() => {
        if (!id) return;
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const foundProduct = storedProducts.find((p) => p.id === parseInt(id));
    
    }, [id]);

    if (!product) {
        return <p className="text-center">Sản phẩm không tồn tại.</p>;
    }

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.push({ ...product, quantity: parseInt(quantity) });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        
       
    };

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
                          {/* <button
                              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                              onClick={() => navigate("/cart")}
                          >
                              <FaShoppingCart size={20} />
                          </button> */}
                          <button
                              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                              onClick={() => navigate("/profile")}
                          >
                              <FaUser size={20} />
                          </button>
                      </div>
                  </nav>
            {/* Product Detail Section */}
            <section className="max-w-4xl mx-auto py-12 bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg shadow-md"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <p className="text-2xl font-bold text-indigo-600 mt-4">
                            {product.price ? `$${product.price.toLocaleString()} $` : "Updating..."}
                        </p>
                        <div className="mt-4 flex items-center">
                            <label className="mr-2 text-gray-700">Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    const value = e.target.value ? parseInt(e.target.value) : 1;
                                    setQuantity(Math.max(1, value));
                                }}
                                min="1"
                                className="border px-2 py-1 w-16 rounded-lg text-center"
                            />
                        </div>
                        <button
                            
                            onClick={() => addToCart(product)}
                            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center">
                            <FaShoppingCart className="mr-2" /> Add to Cart
                        </button>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="max-w-4xl mx-auto py-8 bg-white p-6 rounded-lg shadow-lg mt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
                {reviews.map((review) => (
                    <div key={review.id} className="border-b py-2">
                        <p className="font-bold text-gray-900">{review.user}</p>
                        <div className="flex text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer className="bg-white shadow-md p-6 text-center text-gray-600">
                &copy; 2025 ShoeStore. All rights reserved.
            </footer>
        </div>
    );
}
