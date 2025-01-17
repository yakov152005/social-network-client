import {useEffect, useState} from "react";
import {MAIL_SERVICE, MAILTO, URL_SSE_DATE} from "../../utils/Constants";
import "../../css/home/CreatorStyle.css";

export default function Creator() {
    const [message, setMessage] = new useState("");

    useEffect(() => {
        const sse = new EventSource(URL_SSE_DATE);
        sse.addEventListener("message", (event) => {
            setMessage(event.data);
        });
        return () => {
            sse.close();
        };
    }, [setMessage]);

    return (
        <div className={"creator-div"}>
            <div style={{fontFamily: 'Arial'}}>
                <div className="p-3 mb-2 bg-primary text-white"><strong>Developed By: Yakov Ben HemoⒸ</strong></div>
                <div className="p-3 mb-2 bg-primary text-white"><strong>{message}</strong></div>
                <div className="p-3 mb-2 bg-light text-dark">
                    <h4>Contact Us</h4>
                    <p>
                        Is there any problem?{" "}
                        <a
                            href={MAILTO + MAIL_SERVICE}
                            style={{textDecoration: "underline", color: "blue"}}
                        >
                            Contact us!
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
