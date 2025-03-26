import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Tabs({ children, className, ...props }) {
    const tabValues = React.Children.map(children, (child) => child.props.value);
    const [activeTab, setActiveTab] = useState(tabValues[0]);

    return (
        <div className={cn('tabs', className)} {...props}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { activeTab, setActiveTab, tabValues })
            )}
        </div>
    );
}

export function TabsList({ children, activeTab, setActiveTab, tabValues, className, ...props }) {
    const currentIndex = tabValues.indexOf(activeTab);

    const goPrev = () => {
        if (currentIndex > 0) {
            setActiveTab(tabValues[currentIndex - 1]);
        }
    };

    const goNext = () => {
        if (currentIndex < tabValues.length - 1) {
            setActiveTab(tabValues[currentIndex + 1]);
        }
    };

    return (
        <div className="relative flex items-center justify-center">
                <AnimatePresence>
                    {currentIndex > 0 && (
                        <motion.button
                            onClick={goPrev}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 z-10 bg-white shadow-md rounded-full p-1 ml-2"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <div
                    className={cn(
                        'tabs-list flex overflow-hidden space-x-4 px-8',
                        className
                    )}
                    {...props}
                >
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, { activeTab, setActiveTab })
                    )}
                </div>

                <AnimatePresence>
                    {currentIndex < tabValues.length - 1 && (
                        <motion.button
                            onClick={goNext}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 z-10 bg-white shadow-md rounded-full p-1 mr-2"
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>
        </div>
    );
}

export function TabsTrigger({ value, children, activeTab, setActiveTab, className, ...props }) {
    const isActive = activeTab === value;
    return (
        <button
            className={cn(
                'tabs-trigger flex items-center px-4 py-3 transition-colors duration-300 whitespace-nowrap border-b-2',
                isActive ? 'border-black text-blue-500 font-semibold' : 'border-transparent text-gray-500 hover:text-blue-500',
                className
            )}
            onClick={() => setActiveTab(value)}
            {...props}
        >
            {children}
        </button>
    );
}


export function TabsContent({ value, activeTab, children, className }) {
    return (
        <AnimatePresence mode="wait">
            {value === activeTab && (
                <motion.div
                    key={value}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`${className}`}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
