import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ManagerAccount from "./components/navbar/ManagerAccount";
import {BrowserRouter} from "react-router-dom";


export default function App() {

    /*
    const backgroundStyle = {
        backgroundImage: "url('/image/img_7.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
    };
    style={backgroundStyle}
    */



    return (
        <div>
            <BrowserRouter>
                    <ManagerAccount />
            </BrowserRouter>
        </div>
    )
}
