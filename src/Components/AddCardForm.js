import React, { useState } from "react";
import "./addcardform.css";

function AddCardForm ({ handleAdd }) {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [datetime, setDatetime] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!username.trim() || !message.trim() || !datetime.trim()) {
            alert("Please fill in all fields");
            return;
        }
        const newItem = {
            username: username.trim(),
            message: message.trim(),
            datetime: datetime.trim(),
        };
        handleAdd(newItem);

        setUsername("");
        setMessage("");
        setDatetime("");
        closeWindow();
    };

    const closeWindow = () => {
        document.getElementById("addcard").style.display = "none";
    }

    return (
        <div className="add-card-form">
            <form onSubmit={handleSubmit}>
                <div className="formClose">
                    <label onClick={closeWindow} htmlFor="X">X</label>
                </div>
                <div className="formInfo">

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <label htmlFor="message">Message:</label>
                    <input type="text"
                           id="message"
                           value={message}
                           onChange={(event) => setMessage(event.target.value)}
                    />
                    <label htmlFor="datetime">Date and time:</label>
                    <input
                        type="datetime-local" step={1}
                        id="datetime"
                        value={datetime}
                        onChange={(event) => setDatetime(event.target.value)}
                    />
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default AddCardForm;
