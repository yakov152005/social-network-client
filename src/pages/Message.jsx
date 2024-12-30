import {useEffect, useRef, useState} from "react";
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


export default function Message() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const receiverFromProfileSearch = params.get("receiver");
    console.log(receiverFromProfileSearch)

    const [chatUsers, setChatUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");
    const [sender, setSender] = useState("");


    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    useEffect(() => {
        if (sender) {
            axios.get(URL_SERVER_SIDE + URL_GET_CHAT_USERS + `/${sender}`)
                .then(response => setChatUsers(response.data))
                .catch(error => console.error("Error fetching chat users:", error));
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
            loadChatMessages(receiverFromProfileSearch);
            setCurrentChat(receiverFromProfileSearch);
        }
    }, [receiverFromProfileSearch]);

    const loadChatMessages = async (chatUser) => {
        setCurrentChat(chatUser);
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_MESSAGE_HISTORY + `/${chatUser}&${sender}`);
            if (response.data.success) {
                setMessages(response.data.messageDtos.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt)));
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Error loading chat messages:", error);
        }
    };


    const sendMessage = async (currentChat) => {
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

            await loadChatMessages(currentChat);
        } catch (error) {
            console.error("Error sending message", error);
        }

    };


    return (
        <div style={{display: "flex"}}>

            <div style={{width: "30%", borderRight: "1px solid gray", padding: "10px",}}>
                <h2>Chats</h2>
                <ul>
                    {chatUsers.map((chatUser) => (
                        <li
                            key={chatUser}
                            onClick={() => loadChatMessages(chatUser)}
                            style={{cursor: "pointer", padding: "10px", background: currentChat === chatUser ? "lightgray" : "white",}}>
                            {chatUser}
                        </li>
                    ))}
                </ul>
            </div>


            <div style={{width: "70%", padding: "10px" }}>
                {currentChat ? (
                    <>
                        <h2>Chat with {currentChat}</h2>
                        <div
                            style={{border: "1px solid gray", padding: "10px", height: "400px", overflowY: "scroll",}}>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    style={{textAlign: message.sender === sender ? "right" : "left", margin: "10px 0",}}>
                                    <strong>{message.sender}</strong>:{" "}
                                    {message.content}
                                    <div style={{fontSize: "small", color: "gray",}}>
                                        {FormatDate(message.sentAt)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>

                            <input
                                type="text"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                placeholder="Type a message..."
                            />

                            <button onClick={() => sendMessage(currentChat)}>
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Select a chat to start messaging</p>
                )}
            </div>
        </div>
    );
}

