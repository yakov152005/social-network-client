import axios from "axios";
import Cookies from "universal-cookie";
import { URL_GET_USER, URL_SERVER_SIDE } from "../utils/Constants";

export default class UsernameAPI {
    async fetchUserDetails(setUsername) {
        const cookies = new Cookies();

        try {
            const token = cookies.get("token")?.trim();
            if (!token) {
                console.warn("Token is missing");
                return;
            }
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_USER, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log("Fetched user details:", response.data);
            if (setUsername) {
                setUsername(response.data.username);
            }
            return response.data.username;
        } catch (error) {
            console.error("Error fetching user details:", error);
            throw error;
        }
    }
}
