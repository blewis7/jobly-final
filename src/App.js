import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./nav-routes/Navigation";
import Routes from "./nav-routes/Routes";
import JoblyApi from "./api";
import jwt from "jsonwebtoken";
import UserContext from "./common/UserContext";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    
    async function getCurrentUser() {
      if (token) {
        try {
          let {username} = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData){
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return {success: true};
    } catch (errors){
      console.error("signup failed", errors);
      return {success: false, errors};
    }
  }

  async function login(loginData){
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return {success: true};
    } catch (err) {
      console.error("login failed", err);
      return {success: false, err};
    }
  }

  function hasAppliedToJob(id){
    return applicationIds.has(id);
  }

  function applyToJob(id){
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }



  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
        <div>
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
