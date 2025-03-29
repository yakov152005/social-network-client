import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import {Input2} from "../../components/ui/Input";
import {Button} from "../../components/ui/Button";
import {Avatar} from "../../components/ui/Avatar";
import {ScrollArea} from "../../components/ui/ScrollArea";
import {ChevronLeft, Phone, Video, Info, Smile, SearchIcon} from "lucide-react";
import {
    NAV_PROFILE_SEARCH_BASE, TIME_SEND,
    URL_GET_CHAT_USERS,
    URL_MESSAGE_HISTORY,
    URL_SEND_MESSAGE,
    URL_SERVER_SIDE,
    URL_SSE_USER
} from "../../utils/Constants";
import UsernameAPI from "../../api/UsernameAPI";
import img_null from "../../assets/navbar/User_Profile_null.png"
import {useLocation, useNavigate} from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
import {FaFacebookMessenger} from "react-icons/fa";
import {FiSend} from "react-icons/fi";

export default function Messages() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const receiverFromProfileSearch = params.get("receiver");
    const navigate = useNavigate();


    const [chatUsers, setChatUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentProfilePicture,setCurrentChatProfilePicture] = useState(null);
    const [sender, setSender] = useState("");
    const [senderProfilePic, setSenderProfilePic] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showChatsList, setShowChatsList] = useState(true);
    const [showPicker, setShowPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [pendingMessage, setPendingMessage] = useState("");
    const [sendingChats, setSendingChats] = useState({});

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const handleUserClick = (usernameReceiver) => {
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameReceiver}`);
    };


    const fetchChatUsers = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_CHAT_USERS + `/${sender}`);
            if (response.data.success) {
                setChatUsers(response.data.chatUserDtos);
            }
        } catch (error) {
            console.error("Error fetching chat users:", error);
        }
    };

    const fetchLoadChatMessages = async (chatUser) => {
        setCurrentChat(chatUser);
        setMessageContent("");
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_MESSAGE_HISTORY + `/${chatUser}&${sender}`);
            if (response.data.success) {
                setMessages(response.data.messageDtos.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt)));

                const currentChatUser = chatUsers.find(user => user.receiver === chatUser);
                if (currentChatUser) {
                    setCurrentChatProfilePicture(currentChatUser.profilePicture || img_null);
                }

                setIsFirstLoad(true);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Error loading chat messages:", error);
        }

        if (window.innerWidth < 800) {
            setShowChatsList(false);
        }

    };

    const fetchSendMessage = async (currentChat) => {
        if (!messageContent.trim()) return;

        setPendingMessage(messageContent);
        setSendingChats((prev) => ({ ...prev, [currentChat]: true }));

        try {
            const data = new URLSearchParams();
            data.append("senderUsername", sender);
            data.append("receiverUsername", currentChat);
            data.append("content", messageContent);

            const response = await axios.post(URL_SERVER_SIDE + URL_SEND_MESSAGE, data, {
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            });

            const newMessage = response.data.messageDto;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setPendingMessage("");
            setMessageContent("");

            await fetchLoadChatMessages(currentChat);
        } catch (error) {
            console.error("Error sending message", error);
        } finally {
            setTimeout(() => {
                setSendingChats((prev) => {
                    const copy = { ...prev };
                    delete copy[currentChat];
                    return copy;
                });
            },TIME_SEND)
        }
    };

    const isSending = !!sendingChats[currentChat];

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchSender = async () => {
            try {
                const api = new UsernameAPI();
                await api.fetchUserDetails(setSender, setSenderProfilePic);
            } catch (error) {
                console.error("Failed to load user details", error);
            }
        };
        fetchSender();
    }, []);

    useEffect(() => {
        if (sender) {
            fetchChatUsers();
        }
    }, [sender]);

    useEffect(() => {
        if (sender) {
            const userSse = new EventSource(URL_SSE_USER + `/${sender}`);
            userSse.addEventListener("newMessage", (event) => {
                const newMessage = JSON.parse(event.data);
                if (
                    (newMessage.sender === currentChat && newMessage.receiver === sender) ||
                    (newMessage.sender === sender && newMessage.receiver === currentChat)
                ) {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
            });
            return () => userSse.close();
        }
    }, [sender, currentChat]);

    useEffect(() => {
        if (currentChat) {
            const chatBox = messagesEndRef.current;
            const isAtBottom = chatBox.scrollHeight - chatBox.scrollTop === chatBox.clientHeight;


            if (isAtBottom || messages.length === 0) {
                scrollToBottom();
            }
        }
    }, [messages, currentChat]);

    useEffect(() => {
        if (receiverFromProfileSearch) {
            fetchLoadChatMessages(receiverFromProfileSearch);
            setCurrentChat(receiverFromProfileSearch);
        }
    }, [receiverFromProfileSearch]);

    const handleBack = () => setShowChatsList(true);

    return (
        <div className="flex h-screen bg-white">
            <div
                className={`border-r flex flex-col ${
                    window.innerWidth >= 1724 ? "w-[380px] ml-[220px]" : 
                        window.innerWidth >= 1400 ? "w-[calc(100%-1100px)] ml-[80px]" : 
                        window.innerWidth >= 1100 ? "w-[calc(100%-800px)] ml-[80px]" : 
                        window.innerWidth >= 900 ? "w-[calc(100%-600px)] ml-[80px]" :
                        window.innerWidth >= 800 ? "w-[calc(100%-500px)] ml-[80px]" :
                            "w-full"}
             ${!showChatsList && currentChat && window.innerWidth < 800 ? "hidden" : ""}`}>
                    <div className="p-4 border-b">
                        <h1 className="text-xl font-semibold mb-4">Chats</h1>
                        <div className="relative">
                            <SearchIcon
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"/>
                            <input
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                <ScrollArea className="flex-1">
                    {chatUsers.filter((chat) => chat.receiver.toLowerCase().includes(searchQuery.toLowerCase())).map((chatUser, idx) => (
                        <div
                            key={idx}
                            className={`px-4 py-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer ${currentChat === chatUser.receiver ? "bg-gray-100" : ""}`}
                            onClick={() => fetchLoadChatMessages(chatUser.receiver)}
                        >
                            <div className="relative">
                                <Avatar className="w-12 h-12 object-cover rounded-full"
                                        src={chatUser.profilePicture || img_null} alt={chatUser.receiver}/>
                                <span
                                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                    <h6 className="font-semibold truncate">{chatUser.receiver}</h6>
                                    <span
                                        className="text-xs text-gray-500 whitespace-nowrap">{FormatDate(chatUser.lastMessageTime) || ""}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{chatUser.lastMessage || "Start conversation"}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* Chat Area */}
            <div
                className={`flex-1 flex flex-col ${showChatsList && currentChat && window.innerWidth < 800 ? "hidden" : ""}`}>
                {currentChat ? (
                    <>
                        <div className="p-4 border-b flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {window.innerWidth < 800 && (
                                    <ChevronLeft className="w-6 h-6 cursor-pointer" variant="ghost" size="icon"
                                                 onClick={handleBack}/>
                                )}
                                <Avatar className="w-10 h-10 object-cover rounded-full"
                                        src={chatUsers.find((u) => u.receiver === currentChat)?.profilePicture || img_null}
                                        alt={currentChat} onClick={() => handleUserClick(currentChat)}/>
                                <div>
                                    <h2 className="font-semibold text-base">{currentChat}</h2>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 cursor-pointer"/>
                                <Video className="w-5 h-5 cursor-pointer"/>
                                <Info className="w-5 h-5 cursor-pointer"/>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col overflow-hidden">

                            {isFirstLoad && (
                                <div className="p-4 flex flex-col items-center text-center border-b">
                                    <Avatar className="w-24 h-24 mb-3 object-cover"
                                            src={chatUsers.find((u) => u.receiver === currentChat)?.profilePicture || img_null}
                                            alt={currentChat}/>
                                    <h2 className="text-xl font-semibold">{currentChat}</h2>
                                    {currentChat && (
                                        <p className="text-sm text-gray-500 mb-2">Social Network</p>
                                    )}
                                    <Button variant="outline" size="sm" className="mt-2 bg-gray-50 hover:bg-gray-200"
                                            onClick={() => handleUserClick(currentChat)}>
                                        <span className={"text-gray-700 text-s"}>View profile</span>
                                    </Button>
                                </div>
                            )}


                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    {messages.map((message, index) => (
                                        <div key={index}>
                                            <div
                                                className={`flex ${message.sender === sender ? "justify-end" : "justify-start"}`}>
                                                <div
                                                    className={`max-w-[75%] rounded-2xl px-4 py-2 break-words ${
                                                        message.sender === sender ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                                                    }`}
                                                >
                                                    <p>{message.content}</p>
                                                    <span className="text-xs opacity-70 mt-1 block">
                                                    {FormatDate(message.sentAt)}
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef}/>
                                </div>
                            </ScrollArea>
                        </div>

                        {isSending && (
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-300 animate-pulse rounded-t-md" />
                        )}

                        <div className="p-4 border-t relative">
                            <div className="relative w-full">
                                <Input2
                                    placeholder="Write your message..."
                                    value={isSending ? pendingMessage : messageContent}
                                    onChange={(e) => setMessageContent(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (!isSending && e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            fetchSendMessage(currentChat);
                                        }
                                    }}
                                    disabled={isSending}
                                    className={`w-full rounded-xl bg-gray-50 pl-10 pr-10 transition-opacity duration-200 ${
                                        isSending ? "opacity-60 cursor-not-allowed" : ""
                                    }`}
                                />


                                <button
                                    type="button"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500"
                                    onClick={() => !isSending && setShowPicker(!showPicker)}
                                    disabled={isSending}
                                >
                                    <Smile className="w-5 h-5"/>
                                </button>


                                {isSending ? (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div
                                            className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"/>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 disabled:opacity-50"
                                        onClick={() => fetchSendMessage(currentChat)}
                                        disabled={!messageContent.trim()}
                                    >
                                        <FiSend size={20}/>
                                    </button>
                                )}

                                {showPicker && (
                                    <div className="absolute bottom-12 left-0 z-50">
                                        <EmojiPicker
                                            onEmojiClick={(emoji) => {
                                                setMessageContent((prev) => prev + emoji.emoji);
                                                setShowPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                    </>
                ) : (
                    window.innerWidth < 800 && chatUsers.length > 0 ? ("")
                        :
                        (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <div
                                        className="w-24 h-24 ml-20 rounded-full border border-gray-400 flex items-center justify-center">
                                        <FaFacebookMessenger className="w-12 h-12 text-blue-500"/>
                                    </div>

                                    <h2 className="text-xxl-center font-semibold mb-2 ">Your messages</h2>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-500">Select a chat to start
                                        messaging</h4>
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
}