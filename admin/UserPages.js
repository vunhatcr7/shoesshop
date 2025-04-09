import React from "react";
import {FaUser, FaEnvelope, FaPhone, FaEdit, FaTrash} from "react-icons/fa"
import Logo from "../assets/img/logo1.png"
const userData = [
    {id: 1, name: "Nguyen Van A", email: "A@gmail.com", phone:"0123456789"},
    {id: 1, name: "Nguyen Thi B", email: "B@gmail.com", phone:"0987654321"},
    {id: 1, name: "Tran Van C", email: "C@gmail.com", phone:"0912345678"},
];

const UserPage = () => {
    return(
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">#</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userData.map((user,index) => (
                            <tr key={user.id} className="text-center border-b">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border flex items-center gap-2">
                                    <FaUser className="text-blue-500"/> {user.name}
                                </td>
                                <td className="p-2 border flex items-center gap-2">
                                    <FaEnvelope className="text-red-500"/> {user.email}
                                </td>
                                <td className="p-2 border flex items-center gap-2">
                                    <FaPhone className="text-green-500"/> {user.phone}
                                </td>
                                <td className="p-2 border flex justify-center gap-4">
                                    <button className="text-yellow-500 hover: text-yellow-700">
                                        <FaEdit/>
                                    </button>
                                    <button className="text-red-500 hover: text-red-700">
                                        <FaTrash/>
                                    </button>
                                </td>

                            </tr>

                        ))}   
                    </tbody> 
                        
                </table>
            </div>

        </div>
    )
}
export default UserPage