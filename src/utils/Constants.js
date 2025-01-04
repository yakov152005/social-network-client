const URL_SERVER_SIDE = "http://localhost:8080/social-network";
const URL_SSE_DATE = "http://localhost:8080/sse/stream/date";
const URL_SSE_USER = "http://localhost:8080/sse/stream/user";
const MAIL_SERVICE = "servicenetwork62@gmail.com";
const URL_CREATE_USER = "/add-user";
const URL_LOGIN_USER = "/login-user";
const URL_VERIFY = "/verify-code";
const URL_GET_USER = "/get-user-details";
const URL_GET_ALL_USER_NAMES_AND_PIC = "/get-all-user-names-and-pic";
const URL_RESET_PASSWORD = "/reset-password";
const URL_ADD_POST = "/add-post";
const URL_GET_POST_PROFILE = "/get-post-by-username";
const URL_GET_POST_HOME_FEED = "/home-feed-post";
const URL_ADD_PROFILE_PIC = "/add-profile-pic";
const URL_CHANGE_PASSWORD = "/change-password";
const URL_ALL_FOLLOW_NUM = "/get-num-followers-following";
const URL_GET_PROFILE_SEARCH = "/get-all-details-profile-search";
const URL_FOLLOW = "/follow";
const URL_UNFOLLOW = "/unfollow";
const URL_LIKE = "/like-post";
const URL_UNLIKE = "/unlike-post";
const URL_GET_ALL_LIKES_POST = "/get-all-likes-post";
const URL_MESSAGE_HISTORY = "/get-message-history";
const URL_SEND_MESSAGE = "/send-message";
const URL_GET_CHAT_USERS = "/get-chat-users";
const URL_DELETE_USER = "/delete-user";
const URL_ADD_COMMENT = "/add-comment";
const URL_SHOW_ALL_COMMENT_POST = "/get-all-comment-post";
const URL_GET_ALL_FOLLOWERS_FOLLOWING = "/get-all-followers-following";

const NAV_LOGIN = "/login";
const NAV_CREATE_ACCOUNT = "/createAccount";
const NAV_SETTINGS = "/settingsPage";
const NAV_SEARCH = "/search";
const NAV_PROFILE_SEARCH = "/profileSearch/:usernameSearch"
const NAV_PROFILE_SEARCH_BASE = "/profileSearch";
const NAV_CHANGE_PASSWORD = "/changePassword";
const NAV_CREATOR = "/creator";
const NAV_DASHBOARD = "/dashboard";
const NAV_PROFILE = "/profile";
const NAV_MESSAGE = "/message";
const NAV_ERROR = "*";
const NAV_FORGET_PASSWORD = "/forgetPassword";
const NAV_DELETE_USER = "/deleteUser";
const NAV_DEFAULT = "/";
const PATH = "/";
const MAILTO = "mailto:"

const TIME_LOADING = 2000;
const TIME_LOADING_FAST = 50;
const MAX_SCROLL = 5;

export {
    URL_SERVER_SIDE,
    URL_SSE_DATE,
    URL_CREATE_USER,
    URL_LOGIN_USER,
    URL_VERIFY,
    URL_GET_USER,
    URL_GET_ALL_USER_NAMES_AND_PIC,
    URL_RESET_PASSWORD,
    URL_ADD_POST,
    URL_GET_POST_PROFILE,
    URL_GET_POST_HOME_FEED,
    URL_ADD_PROFILE_PIC,
    URL_ALL_FOLLOW_NUM,
    URL_CHANGE_PASSWORD,
    URL_GET_PROFILE_SEARCH,
    URL_FOLLOW,
    URL_UNFOLLOW,
    URL_GET_CHAT_USERS,
    URL_LIKE,
    URL_UNLIKE,
    URL_GET_ALL_LIKES_POST,
    URL_SSE_USER,
    URL_SEND_MESSAGE,
    URL_MESSAGE_HISTORY,
    URL_DELETE_USER,
    URL_ADD_COMMENT,
    URL_SHOW_ALL_COMMENT_POST,
    URL_GET_ALL_FOLLOWERS_FOLLOWING,
    NAV_DELETE_USER,
    NAV_MESSAGE,
    NAV_LOGIN,
    NAV_CREATE_ACCOUNT,
    NAV_SETTINGS,
    NAV_SEARCH,
    NAV_PROFILE_SEARCH,
    NAV_PROFILE_SEARCH_BASE,
    NAV_CREATOR,
    NAV_DASHBOARD,
    NAV_PROFILE,
    NAV_ERROR,
    NAV_FORGET_PASSWORD,
    NAV_DEFAULT,
    NAV_CHANGE_PASSWORD,
    MAIL_SERVICE,
    MAILTO,
    PATH,
    MAX_SCROLL,
    TIME_LOADING,
    TIME_LOADING_FAST,

};