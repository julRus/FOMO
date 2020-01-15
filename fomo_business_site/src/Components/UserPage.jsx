import React from 'react';
import * as api from './Api';


export default class UserPage extends React.Component {
                 state = {
                   username : "",
                   password : "",
                   
                 };

                 handlePasswordChange = e => {
                   e.preventDefault();
                 };

                 handleBusinessChange = e => {
                   e.preventDefault();
                 };

                 handleUsernameChange = e => {
                   e.preventDefault();
                 };
                 render() {
                   return (
                     <div>
                       <form>
                         <input name="username" />
                         <button>Change Username</button>
                       </form>
                       <br />
                       <form>
                         <input name="password" />
                         <button>Change Password</button>
                       </form>
                       <br />
                       <form>
                         <input name="businessName" />
                         <input name="email" />
                         <input name="address" />
                         <input name="townCity" />
                         <input name="postCode" />
                         <textarea name="description" />
                         <button>Update Business</button>
                       </form>
                     </div>
                   );
                 }
               }