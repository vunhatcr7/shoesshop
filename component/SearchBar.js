import { useState, useEffect, useRef } from "react";
import products from "../data/Product";
import { useNavigate } from "react-router-dom";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={containerRef}>
    
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
    
      />
     

      {showDropdown && query && (
        <div className="absolute top-14 right-0 max-w bg-white shadow-xl rounded-xl z-50 p-4">
          <p className="text-sm text-gray-500 mb-2">Top Suggestions</p>
          <ul className="mb-4">
            <li className="font-semibold"><span className="text-black">air</span> force 1</li>
            <li className="font-semibold"><span className="text-black">air</span> max</li>
            <li className="font-semibold"><span className="text-black">air</span> jordan</li>
          </ul>

          <div className="flex space-x-4 overflow-x-auto">
            {filtered.length > 0 ? (
              filtered.map((products) => (
                <div key={products.id} className="min-w-[150px]">
                  <img
                    src={products.image}
                    alt={products.name}
                    className="w-full h-28 object-cover rounded-lg"
                    onClick={() =>{
                      console.log(`Navigating to:/product/${products.id}`)
                      navigate(`/product/${products.id}`)}} 
              />
                  
                  <h3 className="text-sm font-medium">{products.name}</h3>
                  <p className="text-xs text-gray-500">{products.category}</p>
                  <p className="text-sm font-semibold">{products.price}$</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
