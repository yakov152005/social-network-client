import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {XIcon, SearchIcon} from 'lucide-react';
import {Avatar} from "../ui/Avatar";
import img_null from "../../assets/navbar/User_Profile_null.png";
import {IconMoodEmpty} from "@tabler/icons-react";

export default function SearchPanel({isOpen, onClose, value, onChange, results, onUserClick, sidebarWidth, setValue}) {
    const isMobile = window.innerWidth < 800;

    const handleUserSelect = (username) => {
        onUserClick(username);
        onClose();
    };

    const PanelContent = () => (
        <div className="flex flex-col h-full">

            <div className="flex justify-between items-center p-4 ">
                <h1 className="font-semibold text-xl" style={{marginTop: "10px"}}>Search</h1>
                <button onClick={onClose}><XIcon className="w-6 h-6"/></button>
            </div>


            <div className="p-4" style={{marginTop: "-20px"}}>
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"/>
                    <input
                        type="text"
                        placeholder="Search"
                        value={value}
                        onChange={onChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none"
                    />
                </div>
            </div>

            <div className="w-full h-px bg-gray-300 my-2"/>

            <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-500 font-medium">
                <span>Recent</span>
                <button className="hover:underline text-blue-600 font-semibold" onClick={() => setValue("")}>Clear all
                </button>
            </div>


            <div className="flex-1 overflow-y-auto px-4">
                {results.length > 0 ? (
                    results.map((profile, index) => (
                        <div key={index}
                             className="flex items-center justify-between gap-3 py-2 mb-2 hover:bg-gray-50 rounded cursor-pointer">
                            <div className="flex items-center gap-2" onClick={() => handleUserSelect(profile.username)}>
                                <Avatar
                                    src={profile.profilePicture || img_null}
                                    alt={profile.username}
                                    className="w-10 h-10"
                                />
                                <div className="flex flex-col leading-tight">
                                    <p className="font-medium text-[15px] m-0 p-0">{profile.username}</p>
                                    <p className="text-sm text-gray-500 m-0 p-0">{profile.bio} </p> {/*• Follower */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        {!value && results.length === 0 ? (
                            <p className="text-center text-gray-400 mt-4 flex items-center justify-center gap-2">
                                Search friend <SearchIcon size="20px"/>
                            </p>

                        ) : (
                            <p className="text-center text-gray-400 mt-4 flex items-center justify-center gap-2">
                                No users found... <IconMoodEmpty/>
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );

    return (
        <AnimatePresence>
        {isOpen && (
                <>
                    {!isMobile && (
                        <motion.div
                            initial={{x: -400, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            exit={{x: -400, opacity: 0}}
                            transition={{type: 'spring', stiffness: 300, damping: 30}}
                            className={`fixed top-0 h-full bg-white shadow-lg w-96 z-50`}
                            style={{left: `${sidebarWidth}px`}}
                        >
                            {PanelContent()}
                        </motion.div>
                    )}
                    {isMobile && (
                        <motion.div
                            initial={{y: 400, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: 400, opacity: 0}}
                            transition={{type: 'spring', stiffness: 300, damping: 30}}
                            className="fixed top-0 left-0 w-full h-full bg-white shadow-lg z-30"
                            style={{paddingTop: '60px', paddingBottom: '70px'}}
                        >
                            {PanelContent()}
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
}
