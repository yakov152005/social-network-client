import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {NAV_CREATE_ACCOUNT, NAV_LOGIN, NAV_FORGET_PASSWORD} from "../../utils/Constants";
import {PlusIcon, UserPlusIcon, KeyIcon} from "@heroicons/react/24/outline";
import {LogInIcon} from "lucide-react";
import {Tooltip} from "@mui/material";

export default function HomeSpeedDial() {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const actions = [
        {icon: <LogInIcon className="h-4 w-4"/>, name: "Login", path: NAV_LOGIN},
        {icon: <UserPlusIcon className="h-4 w-4"/>, name: "Register", path: NAV_CREATE_ACCOUNT},
        {icon: <KeyIcon className="h-4 w-4"/>, name: "Forgot Password", path: NAV_FORGET_PASSWORD},
    ];

    return (
        <div
            className="fixed bottom-6 right-6 flex flex-col items-center z-50 group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className={`flex flex-col items-end space-y-3 mb-3 transition-all duration-300 ${
                    hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
            >
                {actions.map((action, index) => (
                    <div
                        key={index}
                        className="flex items-center relative cursor-pointer group/action"
                        onClick={() => navigate(action.path)}
                    >


                        <div
                            className="bg-white p-3 rounded-full shadow-md border border-gray-300 text-black transition-all duration-300 group-hover/action:bg-blue-500 group-hover/action:text-white group-hover/action:scale-110"
                        >
                            <Tooltip
                                title={
                                    <span style={{color: "rgba(5,5,5,255)", fontSize: "12px"}}>{action.name}</span>
                                }
                                placement="right"
                                arrow
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            bgcolor: "white",
                                            boxShadow: 1,
                                        },
                                    },
                                    arrow: {
                                        sx: {
                                            color: "white",
                                        },
                                    },
                                }}
                            >
                                <div>{action.icon}</div>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>


            <button
                className={` p-3 rounded-full shadow-md transition-transform duration-300  ${
                    hovered ? "bg-blue-500 rotate-45" : ""
                }`}
            >
                <PlusIcon className={`h-6 w-6 ${hovered ? "text-white" : "text-blue-600"}`}/>
            </button>
        </div>
    );
}
