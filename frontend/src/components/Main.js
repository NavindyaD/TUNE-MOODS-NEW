import React from 'react';
import './Main.css';

const Main = () => {
  return (
    <main className="main">
      <section id="home">
        <h2>Welcome to the Simple React App</h2>
        <p>This is a simple home page for your React app. You can use this space to introduce your app and provide some basic information.</p>
      </section>
      <section id="about">
        <h2>About</h2>
        <p>This section can contain information about the purpose of the app, who created it, and any other relevant details.</p>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>If you have any questions or feedback, feel free to reach out through the contact information provided here.</p>
      </section>
    </main>
  );
};

export default Main;
