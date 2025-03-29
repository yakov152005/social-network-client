import axios from "axios";
import Cookies from "universal-cookie";
import { URL_GET_USER_DETAILS, URL_SERVER_SIDE } from "../utils/Constants";

export default class UsernameAPI {
    async fetchUserDetails(setUsername,setProfilePicture,setBio,setTwoFactor,setFullName) {
        const cookies = new Cookies();

        try {
            const token = cookies.get("token")?.trim();
            if (!token) {
                console.warn("Token is missing");
                return;
            }
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_USER_DETAILS, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log("Fetched user details:", response.data);
            if (setUsername && setProfilePicture && setBio && setFullName) {
                setUsername(response.data.username);
                setProfilePicture(response.data.profilePicture);
                setBio(response.data.bio);
                setFullName(response.data.fullName);
                return response.data.username && response.data.profilePicture && response.data.bio && response.data.fullName;
            }

            if (setUsername && setProfilePicture && setFullName) {
                setUsername(response.data.username);
                setProfilePicture(response.data.profilePicture);
                setFullName(response.data.fullName);
                return response.data.username && response.data.profilePicture && response.data.fullName;
            }

            if (setUsername && setProfilePicture && setBio && setTwoFactor) {
                setUsername(response.data.username);
                setProfilePicture(response.data.profilePicture);
                setBio(response.data.bio);
                setTwoFactor(response.data.twoFactor);
                return response.data.username && response.data.profilePicture && response.data.bio && response.data.twoFactor;
            }
            if (setUsername  && setTwoFactor) {
                setUsername(response.data.username);
                setTwoFactor(response.data.twoFactor);
                return response.data.username && response.data.twoFactor;
            }
            if (setUsername && setProfilePicture && setBio) {
                setUsername(response.data.username);
                setProfilePicture(response.data.profilePicture);
                setBio(response.data.bio);
                return response.data.username && response.data.profilePicture && response.data.bio;
            }

            if (setUsername && setProfilePicture) {
                setUsername(response.data.username);
                setProfilePicture(response.data.profilePicture);
                return response.data.username && response.data.profilePicture;
            }
            if (setUsername){
                setUsername(response.data.username);
                return response.data.username
            }

        } catch (error) {
            console.error("Error fetching user details:", error);
            throw error;
        }
    }
}
