import { FaTimes, FaUser} from "react-icons/fa";

import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <>
    {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleSidebar} />
    )}
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <span className="text-lg font-medium">Hi, Vu</span>
        <button onClick={toggleSidebar} className="text-xl">
          <FaTimes />
        </button>
      </div>
      <ul className="p-4 space-y-4 text-lg">
        <li className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <FaUser /> Account
          </span>
          <IoIosArrowForward />
        </li>

        {["New & Featured", "Men", "Women", "Sale"].map((item) => (
          <li key={item}>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSubMenu(item)}
            >
              <span>{item}</span>
              <IoIosArrowForward
              className={`transform transition-transform duration-300
              ${openSubMenu === item ? "rotate-90": ""}`} />
            </div>

            {openSubMenu === item && (
              <ul className="pl-4 mt-2 space-y-1 text-sm text-gray-700">
                <li>Top picks</li>
                <li>Shoes</li>
                <li>Clothing</li>
                <li>Accessories</li>
              </ul>
            )}
          </li>
        ))}

        
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
