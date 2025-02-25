import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../redux/api/authApi";
function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loginUser, { data, isLoading, error, isSuccess }] = useLoginUserMutation();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            return;
        }
        await loginUser(form);
        setForm({ email: "", password: "" });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Login successful! 🎉");
            navigate("/")
        }
        if (error) {
            toast.error("Someting Went wrong!");
        }
    }, [isSuccess, data, error])
    return (
        <div className="flex justify-center items-center min-h-screen w-full bg-indigo-500 p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-3xl font-extrabold text-center text-white mb-6">
                    Welcome Back
                </h2>

                {error && <p className="text-red-300 text-center">Both Fields are required</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        Log In
                    </motion.button>
                </form>

                <p className="text-white text-center mt-4 opacity-70">
                    Don't have an account? <Link to="/signup" className="underline">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;