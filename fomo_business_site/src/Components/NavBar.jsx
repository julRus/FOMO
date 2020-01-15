import React from "react";
import { Link } from "@reach/router";

export default function NavBar({ logOut, access}) {
  return (
    <div className="NavBar">
      <ul className="NavLinks">
        <Link to="/">
        {!access && <li className="Link">HOME</li>}
        </Link>
        <Link to="/events">
          <li className="Link">EVENTS</li>
        </Link>
        <li className="Link">FEEDBACK</li>
        {!access && <li className="Link">USER</li>}
        {access && <li className="Link" onClick={()=> logOut() }>Log Out</li>}
      </ul>
    </div>
  );
}
