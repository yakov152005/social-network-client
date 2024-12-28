import React, {useEffect, useState} from "react";
import axios from "axios";
import {URL_GET_ALL_USER_NAMES_AND_PIC, URL_SERVER_SIDE} from "../utils/Constants";
import logo from "../assets/image/iconSocialNetWorkTheOriginalOne.png"
import "../css/SearchStyle.css"
import {IconMoodEmpty} from "@tabler/icons-react";


export default function Search() {
    const [value, setValue] = useState("");
    const [userNamesAndPic, setUserNamesAndPic] = useState([]);
    const [filterByUsernames, setFilterByUsernames] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const fetchUserNames = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_USER_NAMES_AND_PIC);
            if (response.data.success) {
                setUserNamesAndPic(response.data.usernameWithPicDTOS);
            } else {
                console.log(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const getProfileByValue = () => {
        if (value.trim() === "") {
            setFilterByUsernames([]);
            return;
        }

        const filtered = userNamesAndPic.filter((person) =>
            person.username.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilterByUsernames(filtered);
    };


    useEffect(() => {
        fetchUserNames();
    }, []);



    useEffect(() => {
        getProfileByValue();
    }, [value]);






    return (
        <div>
            <div className="alert alert-link" role="alert">
                <h1 style={{color: "blue", fontFamily: 'Brush Script MT'}}><strong>
                    Search page
                </strong></h1>
            </div>
            <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleChange}
                    value={value}
                />
            </form>
            {
                filterByUsernames.length > 0 ? (
                    filterByUsernames.map((profile, index) => (
                        <div className="search-result" key={index}>
                            <img
                                src={profile.profilePicture || logo}
                                alt={profile.username}
                                className="search-profile-picture"
                            />
                            <div className="search-details">
                                <p className="search-username">{profile.username}</p>
                                <p className="search-description">User Bio or additional info</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{color: "gray", fontSize: "15px"}}>
                        No friend found...<IconMoodEmpty stroke={2} size={"15px"}/>
                    </p>
                )
            }
        </div>
    );
}
