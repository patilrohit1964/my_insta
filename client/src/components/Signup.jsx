import { useState } from "react";
import { motion } from "framer-motion";

function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username || !form.email || !form.password) {
            setError("All fields are required!");
            return;
        }
        setError("");
        alert("Signup successful! 🎉");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Sign Up</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
                    >
                        Sign Up
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}

export default Signup;