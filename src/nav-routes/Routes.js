import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Homepage from "../homepage/HomePage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../forms/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../forms/SignupForm";
import PrivateRoute from "./PrivateRoutes";

function Routes({ login, signup }){
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignupForm />} />
                <PrivateRoute exact path="/companies" element={<CompanyList />} />
                <PrivateRoute exact path="/jobs" element={<JobList />} />
                <PrivateRoute exact path="/companies/:handle" element={<CompanyDetail />} />
                <PrivateRoute exact path="/profile" element={<ProfileForm />} />
                <Navigate to="/" />
            </Routes>
        </div>
    );
}

export default Routes;
