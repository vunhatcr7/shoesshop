import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../assets/img/background2.jpg";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "admin@example.com" && password === "password123") {
            navigate("/admin/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-sm w-full bg-opacity-90">
                <h2 className="text-2xl font-bold text-center text-indigo-600">Login</h2>
                <form className="mt-6" onSubmit={handleLogin}>
                    <div>
                        <label className="text-white block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-white block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 mt-4 rounded-lg hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className=" text-white text-gray-700">
                        Don't have an account?
                        <button className="text-indigo-600 hover:underline" onClick={() => navigate("/register")}>Sign up</button>
                    </p>
                    <p className="text-gray-700 mt-2">
                        <button className="text-red-600 hover:underline" onClick={() => navigate("/resetpass")}>Forgot Password?</button>
                    </p>
                </div>
            </div>
        </div>
    );
}