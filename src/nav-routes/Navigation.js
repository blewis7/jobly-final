import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";

function Navigation({logout}){
    const {currentUser} = useContext(React.createContext());

    function loggedInNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/jobs">
                        Jobs
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li>
                    <Link to="/" onClick={logout}>
                        Log out {currentUser.first_name || currentUser.username}
                    </Link>
                </li>

            </ul>
        );
    }

    function loggedOutNav(){
        return (
            <ul>
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Jobly
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}

export default Navigation;