import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css'; // Import the CSS file

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_6bbwg1o', 'template_y0h6tca', form.current, {
        publicKey: 'n1caSqRqsuEpFT6aU',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="contact-container">

      <h2 className="contact-header">Get in Touch</h2>
      <p>We'd love to hear from you! Whether you have a question, feedback, or need assistance, feel free to reach out to us.</p>
      <h4>Contact Information</h4>
      <p>Email: support@emotiontunes.com<br/>Phone: (+94) 343-3243 </p>
      <h4>Contact Form</h4>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="from_name" placeholder='Name' className="contact-input" required />
        <input type="email" name="from_email" placeholder='Email' className="contact-input" required />
        <textarea name="message" placeholder='Message' className="contact-textarea" required />
        
        <input type="submit" value="Send" className="contact-submit" />
      </form>
    </div>
  );
};

export default Contact;
