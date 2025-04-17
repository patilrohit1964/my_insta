import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../redux/api/authApi";
import LayoutHelmet from "./LayoutHelmet";

export default function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const { user } = useSelector(state => state?.auth);
    const navigate = useNavigate();
    const [registerUser, { data, isSuccess, error, isError, isLoading }] = useRegisterUserMutation();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.username || !form.email || !form.password) {
            toast.error("All fields must be entered");
            return;
        }
        await registerUser(form);
    };
    useEffect(() => {
        if (isSuccess) {
            navigate("/");
            toast.success(data?.message || "Signup successful! 🎉");
            setForm({ username: "", email: "", password: "" });
        }
        if (error || isError) {
            toast.error("Signup failed! Please try again");
        }
        if (user) {
            navigate("/");
        }
    }, [data, isError, isSuccess, error])

    return (
        <LayoutHelmet title={"Signup"} description={"this is Signup"}>
            <div className="flex justify-center items-center min-h-screen bg-indigo-500 border border-orange-500">
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
                            {isLoading ? <Loader2 className="animate-spin inline" /> : "Sign Up"}
                        </motion.button>
                    </form>

                    <p className="text-white text-center mt-4 opacity-70">
                        Already have an account? <Link to="/login" className="underline">Log in</Link>
                    </p>
                </motion.div>
            </div>
        </LayoutHelmet>
    );
}
