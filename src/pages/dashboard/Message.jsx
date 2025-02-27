import React, {useEffect, useRef, useState} from "react";
import UsernameAPI from "../../api/UsernameAPI";
import axios from "axios";
import {
    NAV_PROFILE_SEARCH_BASE,
    URL_GET_CHAT_USERS,
    URL_MESSAGE_HISTORY,
    URL_SEND_MESSAGE,
    URL_SERVER_SIDE,
    URL_SSE_USER
} from "../../utils/Constants";
import {useLocation, useNavigate} from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
import send from "../../assets/navbar/send.png";
import "../../css/dashboard/MessageStyle.css"
import img_null from "../../assets/navbar/User_Profile_null.png"
import {Badge} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from '@mui/material/styles';


export default function Message() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const receiverFromProfileSearch = params.get("receiver");
    const navigate = useNavigate();
    console.log(receiverFromProfileSearch)

    const [chatUsers, setChatUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentProfilePicture,setCurrentChatProfilePicture] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");
    const [sender, setSender] = useState("");
    const [senderProfilePic,setSenderProfilePic] = useState("");
    const [isChatListOpen, setIsChatListOpen] = useState(false);

    const messagesEndRef = useRef(null);
    const chatBoxRef = useRef(null);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const fetchLoadChatMessages = async (chatUser) => {
        setCurrentChat(chatUser);
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_MESSAGE_HISTORY + `/${chatUser}&${sender}`);
            if (response.data.success) {
                setMessages(response.data.messageDtos.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt)));

                const currentChatUser = chatUsers.find(user => user.receiver === chatUser);
                if (currentChatUser) {
                    setCurrentChatProfilePicture(currentChatUser.profilePicture || img_null);
                }
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Error loading chat messages:", error);
        }
    };


    const fetchSendMessage = async (currentChat) => {
        try {
            const data = new URLSearchParams();
            data.append("senderUsername", sender);
            data.append("receiverUsername", currentChat);
            data.append("content", messageContent);

            const response = await axios.post(URL_SERVER_SIDE + URL_SEND_MESSAGE, data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const newMessage = response.data.messageDto;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessageContent("");

            await fetchLoadChatMessages(currentChat);
        } catch (error) {
            console.error("Error sending message", error);
        }

    };

    const fetchChatUsers = async () =>{
        if (sender) {
            try {
                const response = await axios.get(URL_SERVER_SIDE + URL_GET_CHAT_USERS + `/${sender}`);
                if (response.data.success){
                    setChatUsers(response.data.chatUserDtos);
                    console.log(response.data.error);
                }
            }catch(error){
                console.error("Error fetching chat users:", error);
            }
        }
    }

    const handleUserClick = (usernameReceiver) => {
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameReceiver}`);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    useEffect(() => {
        if (currentChat) {
            const chatBox = chatBoxRef.current;
            const isAtBottom = chatBox.scrollHeight - chatBox.scrollTop === chatBox.clientHeight;


            if (isAtBottom || messages.length === 0) {
                scrollToBottom();
            }
        }
    }, [messages, currentChat]);

    useEffect(() => {
        const fetchSender = async () => {
            try {
                const api = new UsernameAPI();
                await api.fetchUserDetails(setSender,setSenderProfilePic);
            } catch (error) {
                console.error("Failed to load user details", error);
            }
        }
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
        if (receiverFromProfileSearch) {
            fetchLoadChatMessages(receiverFromProfileSearch);
            setCurrentChat(receiverFromProfileSearch);
        }
    }, [receiverFromProfileSearch]);

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 30,
        height: 30,
        border: `2px solid ${theme.palette.background.paper}`,
    }));

    const toggleChatList = () => {
        setIsChatListOpen(!isChatListOpen);
    };

    const selectChat = (receiver) => {
        fetchLoadChatMessages(receiver);
        setIsChatListOpen(false);
    };

    return (
        <div style={{display: "flex", height: "100vh"}}>
            <button className="hamburger-menu" onClick={toggleChatList}>📩</button>

            <div className={`left-section-message ${isChatListOpen ? "open" : ""}`}>
                <ul className="chat-list">
                    {chatUsers.map((chatUser, index) => (
                        <li
                            key={index}
                            className={`chat-item ${currentChat === chatUser.receiver ? "active" : ""}`}
                            onClick={() => selectChat(chatUser.receiver)}
                        >
                            <img
                                src={chatUser.profilePicture || img_null}
                                alt={chatUser.receiver}
                                style={{borderRadius: "50%", marginRight: "10px", width: "40px", height: "40px"}}
                            />
                            {chatUser.receiver}
                        </li>
                    ))}
                </ul>
            </div>


            <div className="right-section-message">
                {currentChat ? (
                    <>
                        <div style={{padding: "20px", borderBottom: "1px solid #ddd"}}>
                            <h3 style={{color: "gray", marginBottom: "10px", cursor: "pointer"}}
                                onClick={() => handleUserClick(currentChat)}
                            >Chat with {currentChat}</h3>

                            <Badge
                                overlap="circular"
                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                badgeContent={
                                    <SmallAvatar
                                        alt={sender}
                                        src={senderProfilePic}
                                        style={{objectFit: "cover"}}
                                    />
                                }
                            >
                                <Avatar
                                    alt={currentChat}
                                    src={currentProfilePicture}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                    }}
                                />
                            </Badge>
                        </div>


                        <div className="chat-box" ref={chatBoxRef}>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`chat-message ${message.sender === sender ? "right" : ""}`}
                                >
                                    <strong>{message.sender}</strong>
                                    <div className="message-content">{message.content}</div>
                                    <div style={{fontSize: "small", color: "gray"}}>
                                        {FormatDate(message.sentAt)}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef}/>
                        </div>


                        <div className="message-input-container">
                            <textarea
                                className="message-textarea"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                placeholder="Type a message..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        if (messageContent.trim()) {
                                            fetchSendMessage(currentChat);
                                        }
                                    }
                                }}
                            />
                            {messageContent && (
                                <button
                                    className="message-submit-button"
                                    onClick={() => fetchSendMessage(currentChat)}
                                >Send
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="message-placeholder">
                        <img src={send} alt="Logo" className="logo-message"/>
                        <h4><strong>Your messages</strong></h4>
                        <p style={{color: "gray"}}>You can send private messages to friends.</p>
                    </div>
                )}
            </div>
        </div>
    );

}
