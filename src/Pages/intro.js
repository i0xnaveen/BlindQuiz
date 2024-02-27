import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TextToSpeech = () => {
  const [contents, setContents] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-contents');
        if (!response.ok) {
          throw new Error('Failed to fetch contents');
        }
        const data = await response.json();
        setContents(data);
        setHasFetched(true);
        alert(data);
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    };

    if (!hasFetched) {
      fetchContents();
    }
  }, [hasFetched]);

  useEffect(() => {
    const handlePlay = () => {
      const synth = window.speechSynthesis;

      contents.forEach((content) => {
        const utterance = new SpeechSynthesisUtterance(content.contentText);
        const heading = "Instructions to follow";
        utterance.rate = 0.7;
        const ut = new SpeechSynthesisUtterance(heading);
        synth.speak(ut);
        synth.speak(utterance);
      });

      if (contents.length > 0) {
        const lastContent = contents[contents.length - 1];
        const lastUtterance = new SpeechSynthesisUtterance(lastContent.contentText);
        lastUtterance.onend = () => {
          setRedirect(true);
        };
        synth.speak(lastUtterance);
      }
    };

    const handleClick = () => {
      handlePlay();
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [contents]);

  useEffect(() => {
    if (redirect) {
      const timeoutId = setTimeout(() => {
        navigate('/quiz');
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [redirect, navigate]);

  return (
    <div>
      <h2>Instructions to Follow:</h2>
      <ul>
  {contents.map((content, index) => (
    <li key={index}>{content.contentText}</li>
  ))}
</ul>
    </div>
  );
};

export default TextToSpeech;
