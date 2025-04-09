import { FaEdit } from "react-icons/fa";
import SidebarAdmin from "../component/SideBarAdmin";
import Navbar from "../component/NavbarAdmin";
import { useState } from "react";
import Logo from "../assets/img/logo1.png"
const Userprofile = () => {
    const [user, setUser] = useState({
        firstname:"Vu",
        lastname: "Nhat Minh",
        email:"nhatminh125@gmail.com",
        phone: "0868081168",
        bio: "Frontend Noob",
        country: "Vietnam",
        city: "Ho Chi Minh",
        companyID:"120503"
    })

    const [isEditting, setIsEditting] = useState(false)
    const [editData, setEditData] = useState(user)

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name] : e.target.value })
    }

    const handleSave = () => {
        setUser(editData);
        setIsEditting(false);
    };
    return(
        <div className="flex">
        <SidebarAdmin/>
         <div className="flex-1 p-4">
            <Navbar/>
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <div className="bg-white p-6 rounded-lg shadown-md">
                <div className="flex items-center">
                    <img 
                        src="https://i.pinimg.com/736x/27/26/a3/2726a3a3b9e3c31360257fcfb11a7c93.jpg" alt="avatar"
                        className="w-20 h-20 rounded-full"
                    />
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold">{user.lastname} {user.firstname}</h3>
                        <p className="text-gray-500">{user.bio} | {user.city}</p>
                        <p className="text-gray-500 font-semibold">Company ID: <a className="text-lg font-medium"> {user.companyID}</a> </p>
                        
                    </div>
                   
                    <button className="ml-auto text-gray-600 hover:text-blue-500" 
                        onClick={() => setIsEditting(true)}
                    >
                        <FaEdit/>
                    </button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                 
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-gray-500">First Name</p>
                        <p className="text-lg font-medium">{user.firstname}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Last Name</p>
                        <p className="text-lg font-medium">{user.lastname}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Email address</p>
                        <p className="text-lg font-medium">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Phone number</p>
                        <p className="text-lg font-medium">{user.phone}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Bio</p>
                        <p className="text-lg font-medium">{user.bio}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-5 mg-6">
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">Address</h3>
                   
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-gray-500">Country</p>
                        <p className="text-lg font-medium">{user.country}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">City/State</p>
                        <p className="text-lg font-medium">{user.city}</p>
                    </div>
                </div>
            </div>

            {isEditting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={editData.firstname}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={editData.lastname}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div>
              <label className="block text-gray-600"> Country: </label>
                            <input
                                type="text"
                                name="country"
                                value={editData.country}
                                onChange={handleChange}
                                className="border p-2 w-full rounded-md"
                                placeholder=""
                            />
                </div>
                <div>
                            <label className="block text-gray-600"> City/State: </label>
                            <input
                                type="text"
                                name="city"
                                value={editData.city}
                                onChange={handleChange}
                                 className="border p-2 w-full rounded-md"
                                placeholder="(Hanoi,HCM,...)"
                            />
                </div>
              <div className="col-span-2">
                <label className="block text-gray-600">Bio</label>
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditting(false)}
                className="border px-4 py-2 rounded-md mr-2"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
        </div>
        </div>
    )
}
export default Userprofile