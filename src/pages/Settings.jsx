import "../css/SettingsStyle.css"
import {useNavigate} from "react-router-dom";
import {NAV_CHANGE_PASSWORD} from "../utils/Constants";


export default function Settings() {
    const navigate = useNavigate();

    const handleChangePassword = () => {
      navigate(NAV_CHANGE_PASSWORD);
    };

    return(
        <div>
            <br/>
            <br/>
            <button
                className={"btn btn-link"}
                onClick={handleChangePassword}
                type={"button"}
            >
                <strong> Change Password</strong>
            </button>
        </div>
    );
}
