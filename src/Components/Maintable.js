import React from "react";
import {useState , useEffect} from 'react';
import "./maintable.css"
import Pagination from "./Pagination";
import AddCardForm from "./AddCardForm";

function Maintable() {
    const url = "http://localhost:3001/message";
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [showData, setShowData] = useState({});
    const [selectedData, setSelectedData] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const lastItemsIndex = currentPage * itemsPerPage
    const firstItemsIndex = lastItemsIndex - itemsPerPage
    const currentItems = items.slice(firstItemsIndex, lastItemsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(url);
                const listItems = await response.json();
                setItems(listItems);

            } catch (err) {
                console.log(err.stack)
            }
        }

        const handleSidebarClick = (event) => {
            const activeElements = document.querySelectorAll('.active');
            const change = document.getElementById('Change');
            const sidebar = document.getElementById('sidebar');
            if (activeElements.length > 0 && !activeElements[0].contains(event.target)
                && !activeElements[1].contains(event.target) && !change.contains(event.target)
                && !sidebar.contains(event.target)) {
                activeElements.forEach((el) => {
                    el.classList.remove('active');
                    document.querySelectorAll(".sidebar--body--update")[0].style.display = "none";
                    document.querySelectorAll(".sidebar--body--update")[1].style.display = "none";
                    document.getElementsByClassName("sidebar--body")[0].style.display = "none";
                });
            }
        };

        const handleAddCardClick = (event) => {
            const closeWindow = document.getElementById("addcard");
            const open = document.getElementById("open");
            if (closeWindow && !closeWindow.contains(event.target) && !open.contains(event.target)) {
                closeWindow.style.display = "none";
            }
        };

        fetchItems();
        document.addEventListener('click', handleSidebarClick);
        document.addEventListener('click', handleAddCardClick);

        return () => {
            document.removeEventListener('click', handleSidebarClick);
            document.removeEventListener('click', handleAddCardClick);
        };
    }, []);


    const handleClick = (id) => {
        const jsonItem = items.find((item) => item.id === Number(id));
        setSelectedData(jsonItem);
        setShowData({
            id: jsonItem.id,
            username: jsonItem.username,
            message: jsonItem.message,
            datetime: jsonItem.datetime,
        });
        handleActive(id)
        document.getElementsByClassName("sidebar--body")[0].style.display = "block";
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setShowData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleActive = (id) => {
        const cardInfo = document.getElementsByClassName(id)[0];
        const cardInfo2 = document.getElementsByClassName(id)[1];
        if (cardInfo && cardInfo2) {
            cardInfo.classList.add('active');
            cardInfo2.classList.add('active');
        }

        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach((el) => {
            if (el !== cardInfo && el !== cardInfo2 && el.classList.contains('active')) {
                el.classList.remove('active');
            }
        });
    }

    const handleUpdate = async (id , event) => {
        try {
            const response = await fetch(`${url}/${selectedData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(showData),
            });
            const updatedItem = await response.json();
            setItems((prevItems) => prevItems.map((item) => {
                if (item.id === updatedItem.id) {
                    return updatedItem;
                } else {
                    return item;
                }
            }));
            setSelectedData(null);
            setShowData({});
            document.getElementsByClassName("sidebar--body")[0].style.display = "none";
            document.getElementsByClassName("sidebar--body--update")[0].style.display = "none";
            document.getElementsByClassName("sidebar--body--update")[1].style.display = "none";
            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach((el) => {
                el.classList.remove('active');
                document.querySelectorAll(".sidebar--body--update")[0].style.display = "none";
                document.querySelectorAll(".sidebar--body--update")[1].style.display = "none";
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowYesNo = () => {
        setShowButtons(!showButtons);
    }

    const deleteInfoUsername = async (id) => {
        try {
            const patchData = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: "" }),
            };
            const patchResponse = await fetch(`${url}/${id}`, patchData);
            if (!patchResponse.ok) {
                throw new Error('Failed to update item');
            }

            const updatedItems = items.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        username: "",
                    };
                } else {
                    return item;
                }
            });
            setItems(updatedItems);

            const postData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItems.find((item) => item.id === id)),
            };
            const postResponse = await fetch(url, postData);
            if (!postResponse.ok) {
                throw new Error('Failed to update item');
            }
        } catch (error) {
            console.error(error);
        }
        handleShowYesNo()
    };

    const deleteInfoMessage = async (id) => {
        try {
            const patchData = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: "" }),
            };
            const patchResponse = await fetch(`${url}/${id}`, patchData);
            if (!patchResponse.ok) {
                throw new Error('Failed to update item');
            }

            const updatedItems = items.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        message: "",
                    };
                } else {
                    return item;
                }
            });
            setItems(updatedItems);

            const postData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItems.find((item) => item.id === id)),
            };
            const postResponse = await fetch(url, postData);
            if (!postResponse.ok) {
                throw new Error('Failed to update item');
            }
        } catch (error) {
            console.error(error);
        }
        handleShowYesNo()
    };

    const showUpadateBlock = () => {
        document.getElementsByClassName("sidebar--body--update")[0].style.display = "block";
        document.getElementsByClassName("sidebar--body--update")[1].style.display = "block";
    }

    const handleCansel = () => {
        document.getElementsByClassName("sidebar--body")[0].style.display = "none";
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach((el) => {
            el.classList.remove('active');
            document.querySelectorAll(".sidebar--body--update")[0].style.display = "none";
            document.querySelectorAll(".sidebar--body--update")[1].style.display = "none";
        });
    }

    const handleCanselYN = () => {
        setShowButtons(!showButtons);
    }

    const handleAdd = async (newItem) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });
            const createdItem = await response.json();
            setItems((prevItems) => [...prevItems, createdItem]);
        } catch (error) {
            console.error(error);
        }
    };

    const openWindow = () => {
        document.getElementById("addcard").style.display = "block";
    }

    return (
        <div className="Maintable">
            <main >
                <div className="main _containter">
                    <div className="nav _containter">
                        <button id="open" onClick={openWindow}>Add New Card</button>
                    </div>
                    <div className="Table--block">
                        <div className="mainTable ">
                            <div className="mainTable--title">
                                Page {currentPage}
                            </div>
                            <div className="mainTable--Body">
                                {currentItems.map((item) => (
                                    <div id={item.id} onClick={() => handleClick(item.id)} className="card" key={item.id}>
                                        <p>ID: {item.id}</p>
                                        <p id="ItemInfo" className={item.id}> Username: {item.username}
                                            <button id="showYN" onClick={handleShowYesNo} className="card-button">Delete</button>
                                            {showButtons && (
                                                <div>
                                                    <button className="card-button" onClick={() => deleteInfoUsername(item.id)}>yes</button>
                                                </div>
                                            )}
                                            {showButtons && (
                                                <div>
                                                    <button className="card-button" onClick={handleCanselYN}>no</button>
                                                </div>
                                            )}
                                        </p>
                                        <p id="ItemInfo" className={item.id}> Message: {item.message.slice(0, 10)}{item.message.length > 10 ? '...' : ''}
                                            <button onClick={handleShowYesNo} className="card-button">Delete</button>
                                            {showButtons && (
                                                <div>
                                                    <button className="card-button" onClick={() => deleteInfoMessage(item.id)}>yes</button>
                                                </div>
                                            )}
                                            {showButtons && (
                                                <div>
                                                    <button className="card-button" onClick={handleCanselYN}>no</button>
                                                </div>
                                            )}
                                        </p>
                                        <p>Datetime: {item.datetime}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mainTable--pagination">
                                <Pagination
                                    itemsPerPage = {itemsPerPage}
                                    totalItems = {items.length}
                                    paginate = {paginate}
                                />
                            </div>
                        </div>
                        <div id="sidebar" className="sidebar">
                            <div className="sidebar--title">
                                Side panel
                            </div>
                            <div id="sidebarBody" className="sidebar--body">
                                <label htmlFor="ID">ID: {showData.id}</label>
                                <br/>
                                <label htmlFor="username">Username: {showData.username}</label>
                                <br/>
                                <div className="sidebar--body--update">
                                    <input
                                        className="sidebar--body--input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={showData.username || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <br/>
                                <label htmlFor="message">Message:  {showData.message}</label>
                                <br/>
                                <div className="sidebar--body--update">
                                    <input
                                        className="sidebar--body--input"
                                        type="text"
                                        id="message"
                                        name="message"
                                        value={showData.message || ""}
                                        onChange={handleChange}
                                    />
                                    <div className="sidebar--button">
                                        <button onClick={handleUpdate}>Save</button>
                                        <button onClick={handleCansel}>Cansel</button>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar--footer">
                                <button id="Change" onClick={showUpadateBlock}>Change Card</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div id="addcard">
                <AddCardForm handleAdd={handleAdd}/>
            </div>
        </div>
    );
}

export default Maintable;
