import React from "react";
import { motion } from "framer-motion";
import {IconMoodCheck} from '@tabler/icons-react';

export default function LoadingOverlay({ text }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-[9999]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 border border-white/20 shadow-xl rounded-xl px-10 py-8 flex flex-col items-center"
            >
                <div className="w-16 h-16 border-4 border-white/30 border-t-blue-400 rounded-full animate-spin mb-6"></div>
                <p className="text-lg font-semibold text-center text-white flex items-center gap-2">
                    {text}
                    <IconMoodCheck size={26} />
                </p>
            </motion.div>
        </div>
    );
}
