import {useEffect, useState} from "react";


export default function Creator() {
    const [message, setMessage] = new useState("");

    useEffect(() => {
        const sse = new EventSource("http://localhost:8080/sse/stream");
        sse.addEventListener("message", (event) => {
            setMessage(event.data);
        })
    }, [setMessage]);

    return (
        <div>
            <div style={{fontFamily: 'Arial'}}>
                <div className="p-3 mb-2 bg-primary text-white"><strong>Developed By: Yakov Ben HemoⒸ</strong></div>
                <div className="p-3 mb-2 bg-primary text-white"><strong>{message}</strong></div>
            </div>
        </div>
    )
}
