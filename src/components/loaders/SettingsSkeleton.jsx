import { motion } from "framer-motion";

export default function SettingsSkeleton() {
    const pulseAnimation = { opacity: [0.6, 1, 0.6] };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">

                <div className="mb-6 ml-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <motion.div className="w-5 h-5 bg-gray-300 rounded-full" animate={pulseAnimation} transition={{ repeat: Infinity, duration: 1.2 }} />
                        <motion.div className="w-20 h-4 bg-gray-300 rounded" animate={pulseAnimation} transition={{ repeat: Infinity, duration: 1.2 }} />
                    </div>
                    <motion.div className="w-32 h-6 bg-gray-300 rounded" animate={pulseAnimation} transition={{ repeat: Infinity, duration: 1.2 }} />
                </div>


                <motion.div className="mx-6 mb-6 bg-white rounded-lg shadow px-6 py-6" animate={pulseAnimation} transition={{ repeat: Infinity, duration: 1.2 }}>
                    <div className="mb-8 flex items-center">
                        <motion.div className="h-20 w-20 rounded-full bg-gray-300 mr-6" animate={pulseAnimation} transition={{ repeat: Infinity, duration: 1.2 }} />
                        <div className="space-y-2">
                            <motion.div className="w-48 h-4 bg-gray-300 rounded" animate={pulseAnimation} transition={{ repeat: Infinity, duration: 1.2 }} />
                            <motion.div className="w-32 h-3 bg-gray-200 rounded" animate={pulseAnimation} transition={{ repeat: Infinity, duration: 1.2 }} />
                        </div>
                    </div>
                </motion.div>


                <div className="mx-6 mb-6">
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                        {Array(7).fill(0).map((_, idx) => (
                            <motion.div
                                key={idx}
                                className="w-24 h-6 bg-gray-200 rounded"
                                animate={pulseAnimation}
                                transition={{ repeat: Infinity, duration: 1.2 }}
                            />
                        ))}
                    </div>
                </div>


                <motion.div className="mx-6 bg-white rounded-lg shadow px-6 py-6 space-y-6" animate={pulseAnimation} transition={{ repeat: Infinity, duration: 1.2 }}>


                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <motion.div className="w-20 h-4 bg-gray-200 rounded" animate={pulseAnimation} />
                            <motion.div className="h-10 bg-gray-100 rounded" animate={pulseAnimation} />
                        </div>
                        <div className="space-y-2">
                            <motion.div className="w-16 h-4 bg-gray-200 rounded" animate={pulseAnimation} />
                            <motion.div className="h-10 bg-gray-100 rounded" animate={pulseAnimation} />
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <motion.div className="w-24 h-4 bg-gray-200 rounded" animate={pulseAnimation} />
                            <motion.div className="h-10 bg-gray-100 rounded" animate={pulseAnimation} />
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <motion.div className="w-16 h-4 bg-gray-200 rounded" animate={pulseAnimation} />
                            <motion.div className="h-24 bg-gray-100 rounded" animate={pulseAnimation} />
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <motion.div className="w-16 h-4 bg-gray-200 rounded" animate={pulseAnimation} />
                            <motion.div className="h-10 bg-gray-100 rounded" animate={pulseAnimation} />
                        </div>
                        <div className="space-y-2">
                            <motion.div className="w-24 h-4 bg-gray-200 rounded" animate={pulseAnimation} />
                            <motion.div className="h-10 bg-gray-100 rounded" animate={pulseAnimation} />
                        </div>
                    </div>


                    <div className="flex justify-end space-x-4 pt-6">
                        <motion.div className="w-20 h-8 rounded bg-gray-200" animate={pulseAnimation} />
                        <motion.div className="w-20 h-8 rounded bg-gray-300" animate={pulseAnimation} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
