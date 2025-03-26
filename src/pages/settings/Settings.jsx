import React, {useState, useEffect} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Avatar } from "../../components/ui/Avatar";
import { Card, CardContent } from "../../components/ui/Card";
import { ChevronLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";
import img_null from "../../assets/navbar/User_Profile_null.png"
import GeneralSettings from "../../components/settings/GeneralSettings";
import PasswordSettings from "../../components/settings/ChangePassword";
import DeleteUser from "../../components/settings/DeleteUser";
import {NAV_DASHBOARD, URL_GET_USER_SETTINGS, URL_SERVER_SIDE} from "../../utils/Constants";
import axios from "axios";
import UsernameAPI from "../../api/UsernameAPI";
import {FaFacebook, FaGithub, FaLinkedin} from "react-icons/fa";
import {motion} from "framer-motion";
import {FaXTwitter} from "react-icons/fa6";
import LoadingOverlay from "../../components/loaders/LoadingOverlay";

export default function Settings() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("general");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        } catch (error) {
            console.log("Error to fetching user details.", error);
        }
    }

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_USER_SETTINGS + `/${username}`);
            if (response.data.success){
                const user = response.data.userSettingsDto;
                setUserData(user);
            }else {
                console.log(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [document.cookie]);

    useEffect(() => {
        if (username){
            fetchUserData();
        }
    }, [username]);

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    if (loading) return (
        <div>
            <LoadingOverlay text="Loading your details, Wait a few moments..."/>
        </div>
    );


    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container max-w-6xl mx-auto px-4">

                <div className="mb-6 m-9">
                    <button
                        onClick={() => navigate(NAV_DASHBOARD)}
                        className="text-blue-500 hover:text-blue-700 flex items-center font-bold"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1"/>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold mt-4">Settings</h1>
                </div>


                <Card className="m-9">
                    <CardContent className="pt-6">
                        <div className="mb-8 flex items-center">
                            <Avatar className="h-20 w-20 mr-6 rounded-full object-cover"
                                    src={userData?.profilePicture || img_null}
                                    alt="User"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{userData?.fullName || userData?.username || ""}</h2>
                                <p className="text-blue-500 font-bold"
                                   style={{marginLeft: "-5px"}}>@{userData?.username || ""}</p>
                            </div>
                        </div>

                    </CardContent>
                </Card>


                <Tabs
                        defaultValue="general"
                        value={activeTab}
                        onValueChange={handleTabChange}
                        className="space-y-6 m-9"
                    >
                        <TabsList
                            className="flex-nowrap flex overflow-x-hidden overflow-y-hidden scrollbar-hide space-x-4 border-b bg-transparent pb-0 px-8 rounded-none scroll-smooth"
                        >
                            {[
                                { value: "general", label: "General" },
                                { value: "manage", label: "Manage" },
                                { value: "password", label: "Password" },
                                { value: "social-links", label: "Social Links" },
                                { value: "notifications", label: "Notifications" },
                                { value: "privacy", label: "Privacy" },
                                { value: "alerts", label: "Alerts" },

                            ].map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 whitespace-nowrap text-sm sm:text-base py-2 px-1 rounded-none font-medium"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>


                        <TabsContent value="general" className="mt-6">
                            <GeneralSettings userData={userData} fetchUserData={fetchUserData}/>
                        </TabsContent>


                        <TabsContent value="manage" className="mt-6">
                            <DeleteUser/>
                        </TabsContent>

                        <TabsContent value="password" className="mt-6">
                            <PasswordSettings/>
                        </TabsContent>

                        <TabsContent value="social-links" className="mt-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Social Media Links</h3>
                                        <p className="text-gray-500 text-sm">Connect your social media accounts</p>

                                        <div className="space-y-4">
                                            {[
                                                { icon: <FaFacebook className="w-6 h-6" />, placeholder: "Facebook profile URL", className: "facebook" },
                                                { icon: <FaGithub className="w-6 h-6" />, placeholder: "Github profile URL", className: "github" },
                                                { icon: <FaLinkedin className="w-6 h-6" />, placeholder: "Linkedin profile URL", className: "linkedin" },
                                                { icon: <FaXTwitter className="w-6 h-6" />, placeholder: "Twitter profile URL", className: "twitter" },
                                            ].map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 items-center"
                                                >
                                                    <motion.a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1, y: -5 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className={`social-icon ${item.className} flex justify-center items-center w-10 h-10 mb-2 sm:mb-0`}
                                                    >
                                                        {item.icon}
                                                    </motion.a>
                                                    <div className="w-full sm:col-span-8">
                                                        <Input
                                                            disabled
                                                            className="bg-gray-50 w-full"
                                                            placeholder={item.placeholder}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-end gap-3 mt-6">
                                            <Button variant="outline" className="btn btn-light"><span style={{color:"gray", fontSize:"13px"}}>Cancel</span></Button>
                                            <Button>Save</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notifications" className="mt-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="text-lg font-medium mb-4">Notifications Settings</h3>
                                    <p className="text-gray-500 text-sm mb-6">Manage your notification preferences</p>

                                    <div className="space-y-4">
                                        <p className="text-gray-500">This section is coming soon.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="privacy" className="mt-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                                    <p className="text-gray-500 text-sm mb-6">Manage your privacy preferences</p>

                                    <div className="space-y-4">
                                        <p className="text-gray-500">This section is coming soon.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="alerts" className="mt-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="text-lg font-medium mb-4">Alert Settings</h3>
                                    <p className="text-gray-500 text-sm mb-6">Manage your alert preferences</p>

                                    <div className="space-y-4">
                                        <p className="text-gray-500">This section is coming soon.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

            </div>
        </div>
    );
}