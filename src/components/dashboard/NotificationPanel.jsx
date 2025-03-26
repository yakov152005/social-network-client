import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';
import {  differenceInHours, differenceInDays } from 'date-fns';
import { Avatar } from "../ui/Avatar";
import img_null from "../../assets/navbar/User_Profile_null.png";
import formatNotificationDate from "../../utils/FormatNotificationDate";

export default function NotificationPanel({ isOpen, onClose, notifications, sidebarWidth, onUserClick, loading }) {

    const isMobile = window.innerWidth < 800;

    const renderDateCategory = (date) => {
        const diffHours = differenceInHours(new Date(), new Date(date));
        const diffDays = differenceInDays(new Date(), new Date(date));

        if (diffHours < 24) return "NEW";
        if (diffDays <= 30) return "THIS MONTH";
        return null;
    };

    const handleUserSelect = (username) => {
        onUserClick(username);
        onClose();
    };

    const PanelContent = () => {
        const filteredNotifications = notifications.filter(n => renderDateCategory(n.date) !== null);

        const newNotifications = filteredNotifications.filter(n => differenceInHours(new Date(), new Date(n.date)) < 24);
        const monthNotifications = filteredNotifications.filter(n => differenceInHours(new Date(), new Date(n.date)) >= 24);

        return (
            <div className="flex flex-col h-full">


                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="font-semibold text-xl">Notifications</h1>
                    <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-2">


                    {newNotifications.length > 0 && (
                        <>
                            <h2 className="text-gray-500 text-sm font-semibold mb-2 mt-4">NEW</h2>
                            {newNotifications.map((notification, index) => (
                                <NotificationItem key={index} notification={notification}
                                                  handleUserSelect={handleUserSelect}/>
                            ))}
                        </>
                    )}

                    {newNotifications.length > 0 && <div className="w-full h-px bg-gray-300 my-2"/>}


                    {monthNotifications.length > 0 && (
                        <>
                            <h2 className="text-gray-500 text-sm font-semibold mb-2 mt-6">THIS MONTH</h2>
                            {monthNotifications.map((notification, index) => (
                                <NotificationItem key={index} notification={notification}
                                                  handleUserSelect={handleUserSelect}/>
                            ))}
                        </>
                    )}

                    {(!loading && filteredNotifications.length === 0) && (
                        <p className="text-center text-gray-400 mt-10">No notifications</p>
                    )}


                    {loading && Array.from({length: 6}).map((_, idx) => (
                        <NotificationSkeleton key={idx}/>
                    ))}

                </div>

            </div>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {!isMobile && (
                        <motion.div
                            initial={{ x: -400, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -400, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 h-full bg-white shadow-lg w-96 z-50"
                            style={{ left: `${sidebarWidth}px` }}
                        >
                            {PanelContent()}
                        </motion.div>
                    )}
                    {isMobile && (
                        <motion.div
                            initial={{ y: 400, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 400, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 w-full h-full bg-white shadow-lg z-30"
                            style={{ paddingTop: '60px', paddingBottom: '70px' }}
                        >
                            {PanelContent()}
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
}


function NotificationItem({ notification, handleUserSelect }) {
    return (
        <div className="flex justify-between items-center gap-3 py-3 hover:bg-gray-50 rounded cursor-pointer">
            <div className="flex items-center gap-3" onClick={() => handleUserSelect(notification.initiator)}>
                <Avatar
                    src={notification.initiatorProfilePicture || img_null}
                    alt={notification.initiator}
                    className="w-10 h-10"
                />
                <div className="flex flex-col leading-tight">
                    <p className="text-[15px]">
                        <span className="font-medium">{notification.initiator}</span>{" "}
                        <span className="text-gray-500">
                            {notification.type === "follow" && "started following you"}
                            {notification.type === "like" && "liked your post"}
                            {notification.type === "comment" && "commented: "} <strong>{notification.content}</strong>
                        </span>
                    </p>
                    <span className="text-xs text-gray-400"> {formatNotificationDate(notification.date)}</span>
                </div>
            </div>
            {notification.type !== "follow" && (
                <img
                    src={notification.postImg || img_null}
                    alt="Post"
                    className="w-14 h-14 rounded-lg object-cover border border-gray-300"
                />
            )}

        </div>
    );
}


function NotificationSkeleton() {
    return (
        <div className="flex justify-between items-center gap-3 py-3 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex flex-col gap-2">
                    <div className="w-32 h-3 bg-gray-200 rounded" />
                    <div className="w-24 h-2 bg-gray-100 rounded" />
                </div>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded" />
        </div>
    );
}
