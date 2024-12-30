import React, {useEffect, useRef, useState} from "react";
import UsernameAPI from "../api/UsernameAPI";
import axios from "axios";
import {
    URL_GET_CHAT_USERS,
    URL_MESSAGE_HISTORY,
    URL_SEND_MESSAGE,
    URL_SERVER_SIDE,
    URL_SSE_USER
} from "../utils/Constants";
import {useLocation} from "react-router-dom";
import FormatDate from "../utils/FormatDate";
import send from "../assets/navbar/send.png";
import "../css/MessageStyle.css"
import img_null from "../assets/navbar/User_Profile_null.png"


export default function Message() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const receiverFromProfileSearch = params.get("receiver");
    console.log(receiverFromProfileSearch)

    const [chatUsers, setChatUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentProfilePicture,setCurrentChatProfilePicture] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");
    const [sender, setSender] = useState("");

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
                await api.fetchUserDetails(setSender);
            } catch (error) {
                console.error("Failed to load user details", error);
            }
        }
        fetchSender();
    }, []);


    useEffect( () => {
        if (sender){
            fetchChatUsers()
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


    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div className="left-section-message">
                <ul className="chat-list">
                    {chatUsers.map((chatUser, index) => (
                        <li
                            key={index}
                            className={`chat-item ${currentChat === chatUser.receiver ? "active" : ""}`}
                            onClick={() => fetchLoadChatMessages(chatUser.receiver)}
                        >
                            <img
                                src={chatUser.profilePicture ? chatUser.profilePicture : img_null}
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
                        <h2>Chat with {currentChat} </h2>
                        <img
                            src={currentProfilePicture}
                            alt={currentChat}
                            style={{borderRadius: "50%", marginRight: "10px", width: "40px", height: "40px"}}
                        />
                        <div className="chat-box"
                            ref={chatBoxRef}
                            style={{height: "400px", overflowY: "scroll", border: "1px solid gray",}}
                        >
                            {messages.map((message, index) => (
                                <div key={index}
                                     style={{textAlign: message.sender === sender ? "right" : "left", margin: "10px 0",}}>
                                    <strong>{message.sender}</strong>: {message.content}
                                    <div style={{fontSize: "small", color: "gray"}}>
                                        {FormatDate(message.sentAt)}
                                    </div>
                                </div>
                            ))}

                            <div ref={messagesEndRef}/>
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button onClick={() => fetchSendMessage(currentChat)}>Send</button>
                        </div>
                    </>
                ) : (
                    <div>
                        <img src={send} alt="Logo" className="logo-message"/>
                        <h5><strong>Your messages</strong></h5>
                        <p style={{color: "gray"}}>You can send private messages to friends.</p>
                    </div>
                )}
            </div>
        </div>
    );

}