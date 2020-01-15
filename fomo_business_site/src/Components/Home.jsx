import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Home = ({getUser}) => {
  return (
    <div>
      <h1>Homepage</h1>
      <LogIn getUser={getUser}/>
      <SignUp />
    </div>
  );
};

export default Home;