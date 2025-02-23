import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Signup() {
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 border border-orange-500">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-3xl font-extrabold text-center text-white mb-6">
                    Create an Account
                </h2>

                {error && <p className="text-red-300 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div whileFocus={{ scale: 1.05 }}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full p-3 border-none rounded-lg bg-white/30 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </motion.div>

                    <motion.div whileFocus={{ scale: 1.05 }}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-3 border-none rounded-lg bg-white/30 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </motion.div>

                    <motion.div whileFocus={{ scale: 1.05 }}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-3 border-none rounded-lg bg-white/30 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/40 transition cursor-pointer"
                    >
                        Sign Up
                    </motion.button>
                </form>

                <p className="text-white text-center mt-4 opacity-70">
                    Already have an account? <Link to="/login" className="underline">Log in</Link>
                </p>
            </motion.div>
        </div>
    );
}
