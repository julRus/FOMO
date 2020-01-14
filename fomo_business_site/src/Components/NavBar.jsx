import React from "react";
import { Link } from "@reach/router";

export default function NavBar() {
  return (
    <div className="NavBar">
      <ul className="NavLinks">
        <li className="Link">HOME</li>
        <Link to="/Events">
          <li className="Link">EVENTS</li>
        </Link>
        <li className="Link">FEEDBACK</li>
        <li className="Link">USER</li>
      </ul>
    </div>
  );
}