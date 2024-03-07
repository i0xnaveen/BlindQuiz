import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  useEffect(() => {
    // Speak the thank-you message when the component mounts
    const speakThankYou = () => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance("Thank you for completing the quiz! Your responses have been submitted successfully. We appreciate your participation.");
      synth.speak(utterance);
    };

    speakThankYou();

    // Clean up speech synthesis when the component unmounts
    return () => {
      const synth = window.speechSynthesis;
      synth.cancel();
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Thank You for Completing the Quiz!</h2>
      <p style={styles.message}>Your responses have been submitted successfully.</p>
      <p style={styles.message}>We appreciate your participation.</p>
      <Link to="/" style={styles.link}>Back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '28px',
    color: 'white',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    margin: '10px 0',
  },
  link: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default ThankYou;
