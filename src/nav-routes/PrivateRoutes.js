import React, {useContext} from "react";
import {Route, Navigate} from "react-router-dom";

function PrivateRoute({ exact, path, children}){
    const {currentUser} = useContext(React.createContext());

    if (!currentUser){
        return <Navigate to="/login" />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;