import React, {useContext} from "react";
import {Link} from "react-router-dom";

// Homepage for site

function Homepage() {
    const { currentUser } = useContext(React.createContext());

    return (
        <div className="homepage">
            <div className="container">
                <h1>Jobly</h1>
                {currentUser 
                ? <h2>
                    Welcome Back, {currentUser.firstName || currentUser.username}
                </h2>
                : (
                    <p>
                        <Link className="btn btn-primary"
                              to="/login">
                            Log in
                        </Link>
                        <Link className="btn btn-primary"
                              to="/signup">
                            Sign Up
                        </Link>
                    </p>
                )}
            </div>
        </div>
    )
}

export default Homepage;