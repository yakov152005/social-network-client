import {useEffect, useState} from "react";
import axios from "axios";
import {URL_GET_ALL_USER_NAMES, URL_SERVER_SIDE} from "../utils/Constants";

export default function Search(){
    const[value, setValue] = useState("");
    const[names,setNames] = useState([]);
    const[filterNames,setFilterNames] = useState([]);

    const handleChange = (event) =>{
        setValue(event.target.value);
    }

    const fetchUserNames = async () =>{
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_USER_NAMES);
            if (response.data.success){
                setNames(response.data.usernames);
            }else {
                console.log(response.data.error);
            }
        }catch (error){
            console.error("Error fetching data",error);
        }
    }

    useEffect(() => {
        fetchUserNames();
    }, []);

    const getProfileByValue = () => {
        const filtered = names.filter((person) => person.startsWith(value));
        setFilterNames(filtered);
    };

    return(
        <div>
            <h1>Hey search page</h1>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} value={value}/>
                <button className="btn btn-outline-success" type="button" onClick={() => {getProfileByValue()}}>Search</button>
            </form>
            {
                filterNames.length > 0 ? (
                    filterNames.map((name,index) => (
                        <ul key={index}>
                            <li>
                                {name}
                            </li>
                        </ul>
                    ))
                ) : (
                    <p>No data</p>
                )
            }
        </div>
    )
}