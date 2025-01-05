import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {
    NAV_PROFILE_SEARCH_BASE,
    URL_GET_ALL_USER_NAMES_AND_PIC,
    URL_SERVER_SIDE
} from "../../utils/Constants";
import img_null from "../../assets/navbar/User_Profile_null.png"
import "../../css/dashboard/SearchStyle.css"
import {IconMoodEmpty, IconMoodSearch} from "@tabler/icons-react";
import UsernameAPI from "../../api/UsernameAPI";
import {useNavigate} from "react-router-dom";


export default function Search() {
    const [value, setValue] = useState("");
    const [username, setUsername] = useState(null);
    const [userNamesAndPic, setUserNamesAndPic] = useState([]);
    const [filterByUsernames, setFilterByUsernames] = useState([]);

    const navigate = useNavigate();

    const handleUserClick = (usernameSearch) => {
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };


    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };


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

    const getProfileByValue = useCallback(() => {
        if (value.trim() === "") {
            setFilterByUsernames([]);
            return;
        }

        const filtered = userNamesAndPic.filter(
            (person) =>
                person.username.toLowerCase().startsWith(value.toLowerCase()) &&
                person.username.toLowerCase() !== username.toLowerCase()
        );

        setFilterByUsernames(filtered);
    }, [userNamesAndPic, value, username]);



    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        fetchUserNames();
    }, []);



    useEffect(() => {
        getProfileByValue();
    }, [getProfileByValue]);



    return (
        <div className={"search-body"}>
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

                        <div className="search-result" key={index}
                             onClick={() => handleUserClick(profile.username)}
                        >
                            <img
                                src={profile.profilePicture || img_null}
                                alt={profile.username}
                                className="search-profile-picture"
                                onClick={() => handleUserClick(profile.username)}
                            />
                            <div className="search-details">
                                <p className="search-username">{profile.username}</p>
                                <p className="search-description">User Bio or additional info</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        {!value && filterByUsernames.length === 0 ?
                            (
                                <div>
                                    <p style={{color: "gray", fontSize: "15px",marginLeft:"2px"}}>
                                        Search friend!
                                        <IconMoodSearch stroke={2} size={"15px"} style={{marginLeft:"5px"}}/>
                                    </p>
                                </div>

                            )
                            :
                            (
                                <div>
                                    <p style={{color: "gray", fontSize: "15px"}}>
                                        No friend found...
                                        <IconMoodEmpty stroke={2} size={"15px"}/>
                                    </p>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}
