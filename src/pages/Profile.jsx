import React, { useEffect, useState } from "react";
import UsernameAPI from "../api/UsernameAPI";

export default function Profile() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchDetails = async () =>{
           try {
               const api = new UsernameAPI();
               await api.fetchUserDetails(setUsername);
           }catch (error){
               console.error("Failed to load user details", error)
           }
        }
        fetchDetails();
    }, []);



    return (
        <div>
            <h5>Profile</h5>
            <p>Username: {username}</p>
        </div>
    );
}
