import { useState } from "react";
import { ChevronDownIcon, Cog6ToothIcon, UserIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Nút bấm mở dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
      >
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg" 
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <span>Musharof</span>
        <ChevronDownIcon className="w-5 h-5" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-700">
            <p className="font-semibold">Musharof Chowdhury</p>
            <p className="text-sm text-gray-400">randomuser@pimjo.com</p>
          </div>
          <ul className="p-2">
            <Link to='/admin/profile' className="flex items-center p-2 hover:bg-gray-800 cursor-pointer">
              <UserIcon className="w-5 h-5 mr-2" /> User Profile
            </Link>
            <li className="flex items-center p-2 hover:bg-gray-800 cursor-pointer">
              <Cog6ToothIcon className="w-5 h-5 mr-2" /> Account Settings
            </li>
            <li className="flex items-center p-2 hover:bg-gray-800 cursor-pointer">
              <QuestionMarkCircleIcon className="w-5 h-5 mr-2" /> Support
            </li>
            <Link to='/admin/loginadmin'
            className="flex items-center p-2 text-red-400 hover:bg-gray-800 cursor-pointer border-t border-gray-700">
              <ArrowLeftOnRectangleIcon  className="w-5 h-5 mr-2" /> Sign Out
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
