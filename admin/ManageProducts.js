import {  useState } from "react";
import SidebarAdmin from "../component/SideBarAdmin";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import AM270 from "../assets/img/AM270.jpg"
import jd1 from "../assets/img/JD1.jpg"
import Navbar from "../component/NavbarAdmin";
import Logo from "../assets/img/logo1.png"
const ManageProducts = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Air Max 270",
            category: "Nike",
            price: 150.99,
            stock: 10,
            image: AM270,
            description: "A comfortable and stylish sneaker for everyday wear."
        },
        {
            id: 2,
            name: " Jordan 1",
            category: "Nike",
            price: 199.99,
            stock: 15,
            image: jd1,
            description: "Classic Jordan 1 sneakers with premium materials."
        },
    ])
    const [editProduct,setEditProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        image:""
    })
   
    
    const handleDelete = (id) => {
        const newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
    };

    


    const handleEdit = (product) => {
        setEditProduct({ ...product })
    }

    const handleChange = (e) => {
        setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    }

    const handleSave = () => {
        setProducts(
            products.map((product) =>
                product.id === editProduct.id ? editProduct : product 
            )
        );
        setEditProduct(null);
    }
    const handleAddProduct = (e) => {
        e.preventDefault();
        if(!newProduct.name || !newProduct.price || !newProduct.category) {
            alert('Please fill the information');
            return;
        }
    
    const updatedProducts = [
        ...products,
        { id: products.length + 1, ...newProduct },
    ];
    setProducts(updatedProducts);
    setNewProduct({name: "",price: "", category: "", stock: ""});
    setShowForm(false);
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({...newProduct, image: reader.result});
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="flex">
    
         <SidebarAdmin/>    
         
         <div className="flex-1 p-4">
           <Navbar/>  
            
        
        

        <div className="p-6 bg-gray-100 min-h-screen w-full   ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ManageProducts</h2>

            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Price</th>
                    <th className="py-2 px-4 border">Category</th>
                    <th className="py-2 px-4 border">Stock</th>
                    <th className="py-2 px-4 border">Image</th>
                    <th className="py-2 px-4 border">Action</th>
                    </tr> 

                </thead>

                <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="text-center border">
                        <td className="py-2 px-4 border">{product.id}</td>
                        <td className="py-2 px-4 border">{product.name}</td>
                        <td className="py-2 px-4 border">{product.price}$</td>
                        <td className="py-2 px-4 border">{product.category}</td>
                        <td className="py-2 px-4 border">{product.stock}</td>
                        <td className="py-2 px-4 border">
                            <img src={product.image} alt={product.name} className="max-w-md h-20 object-cover "/>    
                        </td>
                        <td className="py-2 px-4 border">
                        <button className="text-blue-500 hover:text-blue-700 mx-2"
                                onClick={() => handleEdit(product)}>
                            <FaEdit/>
                        </button>
                        <button className="text-red-500 hover:text-red-700 mx-2"
                        onClick={() => handleDelete(product.id)}>
                            <FaTrash/>
                        </button>
                        <button className="text-red-500 hover:text-red-700 mx-2"
                       onClick={() => setShowForm(true)}>
                            <MdOutlineAddBox />
                        </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editProduct && (
                <div className="mt-6 p-4 bg-whit shadow-md rounded-lg w-full md:w-1/2 mx-auto">
                <h3 className="text-xl font-bold mb-4">Edit Product</h3>
                <label className="block mb-2">
                    Product Name: 
                    <input 
                    type="text"
                    name="name"
                    value={editProduct.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"/>
                </label>
                <label className="block mb-2">
                    Price: 
                    <input 
                    type="number"
                    name="price"
                    value={editProduct.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"/>
                </label>
                <label className="block mb-2">
                    Category 
                    <input 
                    type="text"
                    name="category"
                    value={editProduct.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"/>
                </label>
                <label className="block mb-2">
                    Stock
                    <input 
                    type="number"
                    name="stock"
                    value={editProduct.stock}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-1"/>
                </label>
                <button onClick={handleSave}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    <FaSave className= "inline mr-2"/>
                    Save
                </button>
                </div>
            )}
            <div className="p-8">
               
                    {showForm && (
                        <form className="bg-white p-4 shadow-md rounded mb-4"
                                onSubmit={handleAddProduct}>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="border p-2 w-full mb-2"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            />

                            <input
                                type="number  "
                                placeholder="Price"
                                className="border p-2 w-full mb-2"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            />
                            <input
                                type="text "
                                placeholder="Category"
                                className="border p-2 w-full mb-2"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                className="border p-2 w-full mb-2"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                            />
                            <input type="file" accept="image/*" className="border p-2 w-full mb-2"
                                    onChange={handleImageUpload}/>
                            {newProduct.image && (
                                <img src={newProduct.image} alt="Preview" className="w-24 h-24 object-cover rounded mb-2"/>
                            )}
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                Save
                            </button>
                        </form>
                    )}

            </div>
            </div> 
        </div>
        </div>
    ) 
}

export default ManageProducts