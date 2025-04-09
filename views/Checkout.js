import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion"
import { useCart } from "../data/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser, FaLastfm } from "react-icons/fa";
import Logo from "../assets/img/logo1.png"
export default function CheckoutPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const {cartCount, cartItems} = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [isOrderplaced, setIsOrderplaced] = useState (false);
    const [cardNumber, setCardNumber] = useState ("");
    const [expiryDate, setExpiryDate] = useState ("");
    const [cvv, setCvv] = useState ("");
    const [isProcessing , setIsProcessing] = useState(false)
    const [cardType, setCardType] = useState("")

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            alert("Thanh toán thành công!");
            setIsProcessing(false);
        }, 2000);
    };
    

    const handleSearch = () => {
        alert(`Searching for: ${searchQuery}`);
    };


    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if(cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
        }

        const orderDetails = {
        cart,
        paymentMethod,
        date: new Date().toISOString(),
    };
        localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

        localStorage.removeItem("cart");
        setCart([]);
        setIsOrderplaced(true)

        setTimeout(() => {
            navigate("/home")
        }, 3000)
};

const totalAmount = cartItems.length > 0 
        ? cartItems.reduce((total, product) => total + product.price * product.quantity, 0)
        : 0;



    return (
<div >
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
        
        <motion.div 
            initial={{ opacity: 0, y:20}}
            animate={{ opacity: 1, y:0}}
            transition={{duration:0.5}}
            className="min-h-screen bg-gray-100 p-6"
        >
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Thanh Toán</h1>
      
            {isOrderplaced ? ( 
                <motion.div 
                initial={{ opacity: 0, scale: 0.8}}
                animate={{ opacity: 1, scale: 1}}
                exit={{ opacity: 0 , scale: 0.8 }}
                transition={{ duration: 0.4}}

                className="bg-green-100 text-green-7000 p-4 rounded-lg text-center">
                    🎉 Đơn hàng của bạn đã được đặt thành công! <br />
                    Bạn sẽ được chuyển về trang chủ trong giây lát...
                </motion.div>
            
           
            ) : cart.length === 0 ? (
                <p className="text-gray-600">Giỏ hang của bạn đang trống</p>
            ) : (
                <div className="mt-10 max-w-6xl mx-auto px-6 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 shadow-md rounded-lg"> 
                        <h2 className="text-xl font-bold mb-4">Sản phẩm của bạn</h2>
                        {cart.map((product, index) => (
                            <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9}}
                            animate={{ opacity: 1, scale: 1}}
                            transition={{ duration: 0.3 , delay: index * 0.1 }} 
                            className="grid grid-cols-3 items-center justify-between border-b pb-4 mb-4"
                            >
                                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
                            <div>
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-500">{product.price.toLocaleString()}$</p>
                                <p className="text-gray-500">Số lượng: {product.quantity}</p>
                            </div>
                            
                            </motion.div>
                            
                        
                        ))}
                         <div className="flex justify-between">
                            <p className="font-semibold">Tổng cộng:</p>
                            <p className="font-semibold">{totalAmount.toLocaleString()}$</p>
                        </div>
                    </div>
            
                    <div className=" mt-10 px-4 py-4 bg-white shadow-md rounded-lg">
                        <h2 className="text-xl text-center font-bold mb-4">Thông tin khách hàng</h2>
                        <form onSubmit={handlePlaceOrder}> 
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold ">Họ và tên</label>
                                <input type="text" className="max-w-md p-2 border rounded-lg"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Số điện thoại</label>
                                <input type="text" className="max-w-md p-2 border rounded-lg"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semi bold">Địa chỉ</label>
                                <input type="text" className="w-full p-2 border rounded-lg"/>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Phương thức thanh toán</h3>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input 
                                            type="radio"
                                            value="COD"
                                            checked={paymentMethod === "COD"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-2"
                                        />
                                        Thanh toán khi nhận hàng (COD)
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio"
                                            value="CreditCard"
                                            checked={paymentMethod === "CreditCard"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-2"
                                        />
                                        CreditCard
                                    </label>
                                    <label className="flex items-center">
                                        <input 
                                            type="radio"
                                            value="E-Wallet"
                                            checked={paymentMethod === "E-Wallet"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-2"
                                        />
                                            Ví điện tử
                                    </label>



                                </div>
                                <div className=" max-h-screen flex items-center justify-center bg-white-100 mt-20">
                                    <AnimatePresence>   
                                    {paymentMethod === "CreditCard" && (                             
                                    <motion.div 
                                        initial={{ opacity: 0, y: 50}}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{opacity: 0, y: -10}}
                                        transition={{duration: 0.5}}
                                        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                                            <h2 class="text-2xl font-bold text-center text-indigo-600 mb-6"> Thông tin thẻ tín dụng </h2>
                                            <div className="mb-4">
                                            <label className="block text-gray-700 font-medium">Loại thẻ</label>
                                            <select 
                                            value={cardType}
                                            onChange={(e) => setCardType(e.target.value)}
                                            className="w-full p-2 border rounded-lg">
                                                <option value="">Chọn loại thẻ</option>
                                                <option value="Visa">Visa</option>
                                                <option value="MasterCard">MasterCard</option>
                                                <option value="AmericanExpress">AmericanExpress</option>

                                            </select>
                                            </div>
                                            {/* <label className="flex items-center">
                                            <input
                                            type="radio"
                                            value="MasterCard"
                                            checked={cardType === "MasterCard"}
                                            onChange={(e) => setCardType(e.target.value)}                                           
                                            className="mr-2"
                                            />
                                            MasterCard
                                            </label>
                                            <label className="flex items-center">
                                            <input
                                            type="radio"
                                            value="Visa"
                                            checked={cardType === "Visa"}
                                            onChange={(e) => setCardType(e.target.value)}                                            
                                            className="mr-2"
                                            />
                                            Visa
                                            </label> */}
                                            <label className="block text-gray-700 font-medium">Số thẻ</label>
                                            <input 
                                            type="text" 
                                            className="w-full p-2 border rounded-lg mb-4 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="0123 4567 8901 2345"
                                            maxLength="19"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            />
                                            <div className="flex space-x-4">
                                                <div className="flex-1">
                                                    <label className="block text-gray-700 font-medium">Ngày hết hạn</label>
                                                    <input 
                                                        type="text"
                                                        className="w-full p-2 border rounded-lg mb-4 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                        value={expiryDate}
                                                        onChange={(e) => setExpiryDate(e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-gray-700 font-medium">CVV</label>
                                                    <input 
                                                        type="text"
                                                        className="max-w-md p-2 border rounded-lg mb-4 focas:ring-indigo-500 focus:border-indo-500"
                                                        placeholder="CVV"
                                                        maxLength={3}
                                                        value={cvv}
                                                        onChange={(e) => setCvv(e.target.value)}
                                                    />

                                                </div>

                                            </div>
                                                    <button 
                                                        className={`w-full mt-6 py-2 text-white font-bold rounded-lg transition 
                                                            ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-400"}`}
                                                            onClick={handlePayment}
                                                            disabled={isProcessing}
                                                    >
                                                        {isProcessing ? "Đang xử lý..." : "Thanh toán"}
                                                    </button>
                                        </motion.div>
                                        )}
                                        </AnimatePresence>

                                </div>

                            </div>
                            <button type="submit" className="mt-4 w-full bg-indigo-600 font-semibold text-white py-2 rounded-lg hover:bg-indigo-700">
                                 Đặt hàng
                            </button>
                        </form>
                    </div>

                </div>
            )}
            {isOrderplaced && (
            <button onClick={() => navigate("/cart")} className="block text-indigo-600 mt-6 hover:underline">
                Quay lại giỏ hàng
            </button>
        )}
        </motion.div>
        </div>
    )
}