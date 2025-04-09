import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../assets/img/bglogin11.jpg";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "admin@example.com" && password === "password123") {
            navigate("/home");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-white/20">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back 👋</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-white mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-white">
                    <p>
                        Don’t have an account?{" "}
                        <button onClick={() => navigate("/register")} className="text-blue-400 hover:underline">
                            Sign up
                        </button>
                    </p>
                    <p className="mt-2">
                        <button onClick={() => navigate("/resetpass")} className="text-blue-500 hover:underline">
                            Forgot Password?
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
