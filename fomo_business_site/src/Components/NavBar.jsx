import React from "react";
import { Link } from "@reach/router";

export default function NavBar() {
  return (
    <div className="NavBar">
      <ul className="NavLinks">
        <Link to="/">
        <li className="Link">HOME</li>
        </Link>
        <Link to="/events">
          <li className="Link">EVENTS</li>
        </Link>
        <Link to="/dashboard">
        <li className="Link">DASHBOARD</li>  
        </Link>
        
        <li className="Link">USER</li>
      </ul>
    </div>
  );
}
