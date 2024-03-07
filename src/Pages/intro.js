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
        const instructions = ["Instructions to follow",
          "Questions are presented using text-to-speech technology, and users listen attentively before selecting an answer.",
          "Voice commands such as Option A, Option B, Option C, or Option D are used to choose an answer, followed by a confirmation command like Confirm or Submit.",
          "The platform then automatically progresses to the next question. This process repeats for each question in the exam.",
          "Users can take their time, ask for question repeats, and navigate back if needed.",
          "Once all questions are answered, the platform redirects them to a Thank You page, signaling the completion of the exam.",
          "To enhance the experience, users are encouraged to speak clearly, pause between commands, and request assistance or inquire about remaining time using designated voice commands.",
          "Prior practice with the voice command functionalities ensures a smoother and more accessible exam-taking experience for blind individuals."
        ];
        
        setContents(instructions);
        setHasFetched(true);
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
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.rate=2.9;
        synth.speak(utterance);
      });

      if (contents.length > 0) {
        const lastContent = contents[contents.length - 1];
        const lastUtterance = new SpeechSynthesisUtterance(lastContent);
        lastUtterance.onend = () => {
          setRedirect(true);
        };
        synth.speak(lastUtterance);
      }
    };
    setTimeout(()=>{
      handlePlay();
    },5000) 

   }, [contents]);

  useEffect(() => {
    if (redirect) {
      const timeoutId = setTimeout(() => {
        navigate('/fetchquiz');
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [redirect, navigate]);

  return (
    <div className="text-to-speech-container ">
      <h2 className="text-center mb-4">Instructions to Follow:</h2>
      <ul className="text-light">
        {contents.map((content, index) => (
          <li key={index}>{content}</li>
        ))}
      </ul>
    </div>
  );
};

export default TextToSpeech;
