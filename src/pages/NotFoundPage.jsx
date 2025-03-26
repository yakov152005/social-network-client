import { IconZoomExclamation } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { NAV_DASHBOARD, NAV_LOGIN, PATH} from "../utils/Constants";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";

export default function NotFoundPage() {
    const cookies = new Cookies();
    const token = cookies.get("token",{path: PATH});
    const navigate = useNavigate();

    const handleLogout = () => {
        if (!token) {
            cookies.remove("token", {path: PATH});
            navigate(NAV_LOGIN);
        }else {
            navigate(NAV_DASHBOARD);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-100">


            <div className="fixed inset-0 backdrop-blur-xl bg-white/50 z-0"></div>


            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 bg-white/70 backdrop-blur-lg rounded-xl shadow-2xl p-10 max-w-md w-full text-center"
            >

                <div className="flex justify-center mb-6">
                    <div className="relative w-20 h-20">
                        {/* Spinner */}
                        <div className="absolute inset-0 border-4 border-red-300 border-t-transparent rounded-full animate-spin"></div>


                        <motion.div
                            animate={{ rotate: [ -10, 10, -10 ] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute top-4 left-4 transform -translate-x-1/2 -translate-y-1/2"
                        >
                            <IconZoomExclamation
                                size={50}
                                stroke={1.5}
                                className="text-red-500"
                            />
                        </motion.div>
                    </div>
                </div>


                <h1 className="text-4xl font-bold text-gray-800 mb-3">404</h1>
                <p className="text-lg font-medium text-gray-700 mb-2">Page Not Found</p>
                <p className="text-sm text-gray-500 mb-8">
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>


                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-md relative overflow-hidden group"
                >
                    <span className="relative z-10">
                        {token ? "Go Home" : "Back to Login"}
                    </span>


                    <motion.i
                        className="bi bi-arrow-right relative z-10"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    ></motion.i>

                    <span className="absolute inset-0 bg-white opacity-10 transition-all duration-300 hover:opacity-20"></span>
                </motion.button>
            </motion.div>
        </div>
    );
}

