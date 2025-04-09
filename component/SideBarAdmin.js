import { FaHome, FaBox, FaUsers, FaSignOutAlt } from "react-icons/fa";
import Logo from "../assets/img/logo1.png"
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
    return (
        <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-5">
           <img src={Logo} alt="Logo" className="h-20 w-20 mb-5  " />
            <nav className="flex flex-col space-y-4">

                <Link to='/admin/dashboard' className="flex items-center space-x-2 hover:text-blue-400">
                    <FaHome/> <span>Dasboard</span>
                </Link>
                <Link to='/admin/product' className="flex items-center space-x-2 hover:text-blue-400">
                    <FaBox/> <span>Manage Products</span>
                </Link>
                <Link to='/admin/users' className="flex items-center space-x-2 hover:text-blue-400">
                    <FaUsers/> <span>Users</span>
                </Link>
               
            </nav>
        </div>
    )
}
export default SidebarAdmin