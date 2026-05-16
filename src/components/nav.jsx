import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";
import logo from "../images/logo.png";
import { useLocation } from "react-router-dom";
function Nav() {
  const location = useLocation();
  const isAiPage = location.pathname.includes("our-Ai");
  return (
    <>
      <ul className={`nav-ul ${isAiPage ? "sidebar-ai-theme" : ""}`}>
        <li className="nav-li"><Link to="/">Home</Link></li>
        <li className="nav-li"><Link to="/about-us">About Us</Link></li>
        <li className="nav-li"><Link to="/our-Ai's">Our AI's</Link></li>
        <li className="nav-li"><Link to="/game">Fun Game</Link></li>
        <li className="nav-li"><Link to="/symptoms">Symptoms</Link></li>

        <li className="logoImg-Name">
          <h2 className="name">MED<span className="guide">GUIDE</span><span className="the-x">X</span></h2>
          <img src={logo} alt="MedGuide Logo" />
        </li>
      </ul>
    </>
  );
}

export default Nav;
