import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = (path) => {
    setActive(path);
    setIsOpen(false); // Close the side panel when a link is clicked
  };

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out successfully!");
    window.location.reload(); // Refresh the page after logout
  };

  return (
    <>
      {/* Top Navbar for Larger Screens */}
      <nav className="navbar">
        <h2>Avinash's Portfolio</h2>
        <div className="links">
          <Link 
            to="/" 
            className={active === '/' ? 'active' : ''}
            onClick={() => handleClick('/')}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={active === '/about' ? 'active' : ''}
            onClick={() => handleClick('/about')}
          >
            About
          </Link>
          <Link 
            to="/projects" 
            className={active === '/projects' ? 'active' : ''}
            onClick={() => handleClick('/projects')}
          >
            Projects
          </Link>
          <Link 
            to="/skills" 
            className={active === '/skills' ? 'active' : ''}
            onClick={() => handleClick('/skills')}
          >
            Skills
          </Link>
          <Link 
            to="/certificates" 
            className={active === '/certificates' ? 'active' : ''}
            onClick={() => handleClick('/certificates')}
          >
            Certificates
          </Link>
          <Link 
            to="/education" 
            className={active === '/education' ? 'active' : ''}
            onClick={() => handleClick('/education')}
          >
            Education
          </Link>
          <Link 
            to="/languages" 
            className={active === '/languages' ? 'active' : ''}
            onClick={() => handleClick('/languages')}
          >
            Languages
          </Link>
          <Link 
            to="/contact" 
            className={active === '/contact' ? 'active' : ''}
            onClick={() => handleClick('/contact')}
          >
            Contact
          </Link>

          {/* Conditional Login/Logout Button */}
          {!isLoggedIn ? (
            <Link 
              to="/login" 
              className={active === '/login' ? 'active' : ''}
              onClick={() => handleClick('/login')}
            >
              Login
            </Link>
          ) : (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger" onClick={toggleSidePanel}>
          &#9776;
        </div>
      </nav>

      {/* Side Panel for Mobile */}
      <div className={`side-panel ${isOpen ? 'open' : ''}`}>
        <div className="side-links">
          <Link 
            to="/" 
            className={active === '/' ? 'active' : ''}
            onClick={() => handleClick('/')}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={active === '/about' ? 'active' : ''}
            onClick={() => handleClick('/about')}
          >
            About
          </Link>
          <Link 
            to="/projects" 
            className={active === '/projects' ? 'active' : ''}
            onClick={() => handleClick('/projects')}
          >
            Projects
          </Link>
          <Link 
            to="/skills" 
            className={active === '/skills' ? 'active' : ''}
            onClick={() => handleClick('/skills')}
          >
            Skills
          </Link>
          <Link 
            to="/certificates" 
            className={active === '/certificates' ? 'active' : ''}
            onClick={() => handleClick('/certificates')}
          >
            Certificates
          </Link>
          <Link 
            to="/education" 
            className={active === '/education' ? 'active' : ''}
            onClick={() => handleClick('/education')}
          >
            Education
          </Link>
          <Link 
            to="/languages" 
            className={active === '/languages' ? 'active' : ''}
            onClick={() => handleClick('/languages')}
          >
            Languages
          </Link>
          <Link 
            to="/contact" 
            className={active === '/contact' ? 'active' : ''}
            onClick={() => handleClick('/contact')}
          >
            Contact
          </Link>

          {/* Conditional Login/Logout Button for Mobile */}
          {!isLoggedIn ? (
            <Link 
              to="/login" 
              className={active === '/login' ? 'active' : ''}
              onClick={() => handleClick('/login')}
            >
              Login
            </Link>
          ) : (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
      {/* Overlay for closing the side panel */}
      {isOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
    </>
  );
};

export default Navbar;
