import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import SearchEvents from './components/SearchEvents';
import Login from './components/Login';
import BookingForm from './components/BookingForm';
import background from './assets/background.jpeg'
import AdminPage from './components/AdminPage';
import MyAccount from './components/MyAccount'; // Import the MyAccount component

//if user is logged in, show logout button
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    //check session storage for isAuthenticated
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      setLoggedIn(true);
    }
  }
  );

  //check if user is of type admin, if so, show admin button
  useEffect(() => {
    //check session storage for user type, if admin, show admin button
    if (sessionStorage.getItem('type') === "Admin") {
      setIsAdmin(true);
    }
  }
  );

  const logout = () => {
    //clear all session storage
    sessionStorage.clear();
    setLoggedIn(false);
    //redirect to home page
    window.location.href = "/";
  }

  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" to="/">EventsBlitz</a>

            <div class="" id="navbarNav">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <Link class="nav-link" to="/">Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/search">Search Events</Link>
                  </li>
                  <li className="nav-item">
                    {!isAdmin && (
                      <Link className="nav-link" to={loggedIn ? "/myaccount" : "/login"}>
                        {loggedIn ? "My Account" : "Login"}
                      </Link>
                    )}
                  </li>
                  {isAdmin && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/AdminPage">Admin</Link>
                    </li>
                  )}
                {loggedIn &&
                  <li class="nav-item">
                    <Link class="nav-link" to="/" onClick={logout}>Logout</Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>

        <div class="container-fluid vh-100 p-5" style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}>
          <Routes>
            <Route path="/search" element={<SearchEvents />} />
            <Route path="/myaccount" element={<MyAccount />} /> 

            <Route path="/login" element={<Login />} />
            <Route path="/booking/detail" element={<BookingForm />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Home />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;