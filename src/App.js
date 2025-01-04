import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ManagerAccount from "./components/navbar/ManagerAccount";
import {BrowserRouter} from "react-router-dom";



export default function App() {
    return (
        <div>
            <BrowserRouter>
                <ManagerAccount/>
            </BrowserRouter>
        </div>
    )
}
