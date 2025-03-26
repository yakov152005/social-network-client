import { motion } from "framer-motion";

export default function ProfileSkeleton() {
    const pulseAnimation = { opacity: [0.6, 1, 0.6] };

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">

            <div className="flex flex-col md:flex-row md:items-start md:space-x-10 mb-6 md:mb-10">

                <motion.div
                    className="relative w-32 h-32 rounded-full bg-gray-200 border-4 border-pink-500 mx-auto md:mx-0"
                    animate={pulseAnimation}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />


                <div className="flex flex-col space-y-4 mt-4 md:mt-0 flex-1">

                    <div className="flex flex-col space-y-2">
                        <motion.div
                            className="w-32 h-6 bg-gray-200 rounded"
                            animate={pulseAnimation}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="w-24 h-4 bg-gray-100 rounded"
                            animate={pulseAnimation}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        />
                    </div>


                    <div className="flex flex-col space-y-2">
                        <motion.div
                            className="w-72 h-4 bg-gray-100 rounded"
                            animate={pulseAnimation}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="w-60 h-4 bg-gray-100 rounded"
                            animate={pulseAnimation}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        />
                    </div>


                    <div className="flex space-x-6 mt-2">
                        <motion.div
                            className="w-16 h-4 bg-gray-200 rounded"
                            animate={pulseAnimation}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="w-16 h-4 bg-gray-200 rounded"
                            animate={pulseAnimation}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="w-16 h-4 bg-gray-200 rounded"
                            animate={pulseAnimation}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </div>


            <div className="flex justify-center space-x-8 mb-6">
                {[1, 2, 3].map((_, index) => (
                    <motion.div
                        key={index}
                        className="w-16 h-4 bg-gray-200 rounded"
                        animate={pulseAnimation}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    />
                ))}
            </div>


            <div className="border-b border-gray-300 mb-6"></div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <motion.div
                        key={index}
                        className="aspect-square bg-gray-200"
                        animate={pulseAnimation}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                ))}
            </div>
        </div>
    );
}
