import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../assets/img/bglogin9.jpg";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        agree: false,
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const registerUser = async (formData) => {
        try {
            const response = await fetch("https://your-api.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error:", error);
            return { success: false, message: "Server error!" };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (formData.password !== formData.confirmpassword) {
            setMessage("Passwords do not match");
            return;
        }

        if (!formData.agree) {
            setMessage("You must agree to the terms");
            return;
        }

        if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) {
            setMessage("Please select your birth date");
            return;
        }

        const response = await registerUser(formData);
        if (response.success) {
            setMessage("Registration successful!");
            navigate("/");
        } else {
            setMessage(response.message);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
            >
                <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account ✨</h2>

                {message && <p className="text-red-400 text-center mb-4">{message}</p>}

                {/* Email */}
                <label className="block text-white font-medium mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                />

                {/* Password */}
                <label className="block text-white font-medium mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                />

                {/* Confirm Password */}
                <label className="block text-white font-medium mb-1">Confirm Password</label>
                <input
                    type="password"
                    name="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    required
                />

                {/* Birth Date */}
                <label className="block text-white font-medium mb-1">Birth Date</label>
                <div className="flex gap-2 mb-4">
                    <select
                        name="birthDay"
                        value={formData.birthDay}
                        onChange={handleChange}
                        className="flex-1 px-2 py-2 rounded bg-white/20 text-black border border-white/30 focus:outline-none"
                    >
                        <option value="">Day</option>
                        {[...Array(31)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <select
                        name="birthMonth"
                        value={formData.birthMonth}
                        onChange={handleChange}
                        className="flex-1 px-2 py-2 rounded bg-white/20 text-black border border-white/30 focus:outline-none"
                    >
                        <option value="">Month</option>
                        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((month, i) => (
                            <option key={i} value={month}>{month}</option>
                        ))}
                    </select>
                    <select
                        name="birthYear"
                        value={formData.birthYear}
                        onChange={handleChange}
                        className="flex-1 px-2 py-2 rounded bg-white/20 text-black border border-white/30 focus:outline-none"
                    >
                        <option value="">Year</option>
                        {[...Array(70)].map((_, i) => (
                            <option key={i} value={2025 - i}>{2025 - i}</option>
                        ))}
                    </select>
                </div>

                {/* Terms */}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <span className="text-white text-sm">
                        I accept the <a href="#" className="text-blue-400 underline">Terms and Conditions</a>
                    </span>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Create Account
                </button>

                {/* Login redirect */}
                <p className="text-white text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <button onClick={() => navigate("/")} className="text-blue-400 hover:underline">
                        Sign in
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Register;
