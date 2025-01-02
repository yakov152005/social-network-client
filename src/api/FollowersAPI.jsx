import axios from "axios";
import {URL_GET_ALL_FOLLOWERS_FOLLOWING, URL_SERVER_SIDE} from "../utils/Constants";

export default class FollowersAPI{
    fetchFollowingAndFollowers = async (username,setGetAllFollowers,setGetAllFollowing) => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_FOLLOWERS_FOLLOWING + `/${username}`);
            if (response.data.success) {
                setGetAllFollowers(response.data.getAllFollowers);
                setGetAllFollowing(response.data.getAllFollowing);
            }
        } catch (error) {
            console.log("Error to fetching data", error);
        }
    };

}