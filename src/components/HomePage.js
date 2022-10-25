import React from 'react';
import "./HomePage.css";

function HomePage() {
  return (
    <div className = "HomePage">
      <div>
        <h3> Register Student</h3>
        <input placeholder="Email" />
        <input placeholder="Password" />

        <button>Create Account</button>
      </div>

      <div>
        <h3> Login Student</h3>
        <input placeholder="Email" />
        <input placeholder="Password" />

        <button>Login</button>
      </div>

    </div>
  );
}
export default HomePage;
