import axios from "axios";
import {URL_ALL_FOLLOW_NUM, URL_SERVER_SIDE} from "../utils/Constants";

export default class FollowsNumberAPI{
    fetchFollowingAndFollowersNumbers = async (username,setFollowers,setFollowing) => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_ALL_FOLLOW_NUM + `/${username}`);
            if (response.data.success) {
                setFollowers(response.data.followers);
                setFollowing(response.data.following);
            } else {
                console.log(response.data.error);
            }
        } catch (error) {
            console.log("Error to fetching data", error);
        }
    };

}
