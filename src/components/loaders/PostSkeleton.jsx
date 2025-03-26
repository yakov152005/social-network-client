import { motion } from "framer-motion";

export default function PostSkeleton() {
    const pulseAnimation = {
        opacity: [0.6, 1, 0.6],
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
            <div className="p-4 flex items-center space-x-3">
                <motion.div
                    className="w-12 h-12 bg-gray-200 rounded-full"
                    animate={pulseAnimation}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
                <div className="flex flex-col space-y-2">
                    <motion.div
                        className="w-32 h-4 bg-gray-200 rounded"
                        animate={pulseAnimation}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="w-20 h-3 bg-gray-100 rounded"
                        animate={pulseAnimation}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    />
                </div>
            </div>

            <motion.div
                className="w-full h-[400px] bg-gray-200"
                animate={pulseAnimation}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            <div className="p-4 space-y-4">
                <div className="flex space-x-4">
                    <motion.div
                        className="w-8 h-8 bg-gray-200 rounded-full"
                        animate={pulseAnimation}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="w-8 h-8 bg-gray-200 rounded-full"
                        animate={pulseAnimation}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    />
                </div>
                <motion.div
                    className="w-48 h-4 bg-gray-200 rounded"
                    animate={pulseAnimation}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
                <motion.div
                    className="w-64 h-3 bg-gray-100 rounded"
                    animate={pulseAnimation}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}
