import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerAccount from "./components/ManagerAccount";
import {BrowserRouter} from "react-router-dom";


export default function App(){


  return(
     <div>
         <BrowserRouter>
         <ManagerAccount />
         </BrowserRouter>
     </div>
  )
}
