import { FaRegBell,  FaSearch } from "react-icons/fa";
import UserDropdown from "./UserAdmin";

const Navbar = () => {
    return (
        <div className="flex justify-between bg-white p-4 shadow-md">
            <div className="flex items-center space-x-2">
                <FaSearch className=" w-6 h-6 text-gray-600"/>
                <input type="text" placeholder="Search..." className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-black/90 dark:placeholder:text-black/30 dark:focus:border-brand-800 xl:w-[430px]"/>
            </div>
            <div className="flex items-center space-x-4">
                <FaRegBell className="w-6 h-6 text-gray-600"/>
                <UserDropdown/>
            </div>
        </div>
    )
}
export default Navbar;