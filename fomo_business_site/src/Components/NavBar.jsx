import React from "react";
import { Link } from "@reach/router";
import * as api from "./Api";

export default function NavBar({ logOut, access}) {
  function apiLog(){
    api.logOut(access).then(response => console.log(response))
      .catch(response => console.log(response));
  }
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
        <Link to="/business_account">
        {access && <li className="Link">BUSINESS</li>}
        </Link>
        {access && <li className="Link" onClick={()=> {logOut()
        // apiLog()
         }}>LOG OUT</li>}
        <Link to="/dashboard">
         {access &&  <li className="Link">DASHBOARD</li>}  
        </Link>

      </ul>
    </div>
  );
}
