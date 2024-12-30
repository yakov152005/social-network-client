import "../css/SettingsStyle.css"
import {useNavigate} from "react-router-dom";
import {NAV_CHANGE_PASSWORD, NAV_DELETE_USER} from "../utils/Constants";


export default function Settings() {
    const navigate = useNavigate();

    const handleChangePassword = () => {
      navigate(NAV_CHANGE_PASSWORD);
    };

    const handleDeleteUser = () => {
        navigate(NAV_DELETE_USER);
    };

    return(
        <div>
            <br/>
            <br/>
            <button
                className={"btn btn-outline-danger"}
                onClick={handleChangePassword}
                type={"button"}
            >
                <strong> Change Password</strong>
            </button>
            <br/>
            <br/>
            <button
                className={"btn btn-outline-danger"}
                onClick={handleDeleteUser}
                type={"button"}
            >
                <strong> Delete User</strong>
            </button>
        </div>
    );
}
