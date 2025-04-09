import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../assets/img/bglogin10.jpg";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.email === email);

        if (user) {
            setMessage(`Your password is: ${user.password}`);
        } else {
            setMessage("Email not found! Please check your email or register.");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <form
                onSubmit={handleForgotPassword}
                className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-white text-center mb-6">Forgot Password</h2>

                <label className="text-sm text-gray-300 font-semibold">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 mt-1 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                {message && <p className="text-blue-400 text-sm mb-4">{message}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                >
                    Reset Password
                </button>

                <div className="mt-4 text-center">
                    <p className="text-gray-300 text-sm">
                        Remembered your password?{" "}
                        <button
                            type="button"
                            className="text-blue-400 hover:underline"
                            onClick={() => navigate("/")}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}
