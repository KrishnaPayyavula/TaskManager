import React, { useState, useEffect } from "react";


function NavBar(props) {
    const [currentRole, setCurrentRole] = useState("");
    useEffect(() => {
        const userDetails = localStorage.getItem("userDetails");
        if (userDetails !== undefined && userDetails !== null) {
            let { user } = JSON.parse(userDetails);
            setCurrentRole(user.role);
        }
    }, [])
    return (
        <nav>
            <ul>
                <li>Tasks</li>
                {currentRole && <li>Users</li>}
                <li>

                </li>
            </ul>
        </nav>
    )
}