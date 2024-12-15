import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerAccount from "./components/ManagerAccount";

export default function App(){


  return(
      <div>
      <ManagerAccount/>
      </div>
  )
}


/*
import './App.css';
import React, { useState } from "react";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import SettingsPage from "./components/SettingsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Creator from "./components/Creator";

function App() {
  const [activeTab, setActiveTab] = useState("createAccount");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("createAccount");
  };

  return (
      <div className="App container mt-4">

        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
                className={`nav-link ${activeTab === "createAccount" ? "active" : ""}`}
                id="pills-createAccount-tab"
                onClick={() => setActiveTab("createAccount")}
                type="button"
                role="tab"
                aria-controls="pills-createAccount"
                aria-selected={activeTab === "createAccount"}
                disabled={isLoggedIn}
            >
              Create Account
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
                className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                id="pills-login-tab"
                onClick={() => setActiveTab("login")}
                type="button"
                role="tab"
                aria-controls="pills-login"
                aria-selected={activeTab === "login"}
                disabled={isLoggedIn}
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
                className={`nav-link ${activeTab === "settingsPage" ? "active" : ""}`}
                id="pills-settingsPage-tab"
                onClick={() => setActiveTab("settingsPage")}
                type="button"
                role="tab"
                aria-controls="pills-settingsPage"
                aria-selected={activeTab === "settingsPage"}
                disabled={isLoggedIn}
            >
              Settings Page
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
                className={`nav-link ${activeTab === "Creator" ? "active" : ""}`}
                id="pills-Creator-tab"
                onClick={() => setActiveTab("Creator")}
                type="button"
                role="tab"
                aria-controls="pills-Creator"
                aria-selected={activeTab === "Creator"}
                disabled={isLoggedIn}
            >
              Creator
            </button>
          </li>
        </ul>


        <div className="tab-content" id="pills-tabContent">
          {activeTab === "createAccount" && (
              <div
                  className="tab-pane fade show active"
                  id="pills-createAccount"
                  role="tabpanel"
                  aria-labelledby="pills-createAccount-tab"
              >
                <CreateAccount/>
              </div>
          )}
          {activeTab === "login" && (
              <div
                  className="tab-pane fade show active"
                  id="pills-login"
                  role="tabpanel"
                  aria-labelledby="pills-login-tab"
              >
                <Login onLogin={handleLogin} onLogout={handleLogout} />
              </div>
          )}
          {activeTab === "settingsPage" && (
              <div
                  className="tab-pane fade show active"
                  id="pills-settingsPage"
                  role="tabpanel"
                  aria-labelledby="pills-settingsPage-tab"
              >
                <SettingsPage />
              </div>
          )}
          {activeTab === "Creator" && (
              <div
                  className="tab-pane fade show active"
                  id="pills-Creator"
                  role="tabpanel"
                  aria-labelledby="pills-Creator-tab"
              >
                <Creator />
              </div>
          )}

        </div>
      </div>
  );
}

export default App;
 */
/*
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SettingsPage from "./components/SettingsPage";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/createAccount">Create Account</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/settingsPage">Settings Page</Link>
              </li>
            </ul>
          </nav>


          <Routes>
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settingsPage" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

 */