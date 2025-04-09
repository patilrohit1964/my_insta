import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../redux/api/authApi";
import LayoutHelmet from "./LayoutHelmet";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../redux/slicers/authSlice";
import { Loader2 } from "lucide-react";
function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loginUser, { data, isLoading, error, isSuccess }] = useLoginUserMutation();
    const { user } = useSelector(state => state?.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            return;
        }
        const res = await loginUser(form).unwrap();
        dispatch(userLoggedIn({ user: res.user, token: res.token }))
        setForm({ email: "", password: "" });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Login successful! 🎉");
            navigate("/");
        }
        if (error) {
            toast.error("Someting Went wrong!");
        }
        if (user) {
            navigate("/");
        }
    }, [isSuccess, data, error])
    return (
        <LayoutHelmet title={"Login"} description={"this is Login"}>
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
                            {isLoading ? <Loader2 className="animate-spin inline" /> : "Log In"}
                        </motion.button>
                    </form>

                    <p className="text-white text-center mt-4 opacity-70">
                        Don't have an account? <Link to="/signup" className="underline">Sign Up</Link>
                    </p>
                </motion.div>
            </div>
        </LayoutHelmet>
    );
}

export default Login;