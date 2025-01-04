import axios from "axios";
import {URL_SERVER_SIDE} from "../utils/Constants";

export default class UserProfilePicAPI{
    async fetchProfilePic(username,setProfilePic){
        try {
            const response = await axios.get(URL_SERVER_SIDE + `/get-profile-pic/${username}`);
            if (response.data.success){
                setProfilePic(response.data.profilePicture);
            }
            return response.data.profilePicture;
        }catch (error){
            console.log("Error to fetching profile pic.",error);
        }
    }
}