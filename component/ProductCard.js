import products from "../data/Product";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ product, addToCart }) {
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
          
                <motion.div
                    key={products.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay:0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-md cursor-pointer"
                        onClick={() =>{
                            console.log(`Navigating to:/product/${product.id}`)
                            navigate(`/product/${product.id}`)}} 
                    />
                    <h4 className="mt-2 font-bold text-gray-900">{product.name}</h4>
                    <p className="text-gray-600">{product.price} $</p>
                    <button
                        className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                </motion.div>
          
        </div>
    );
}
