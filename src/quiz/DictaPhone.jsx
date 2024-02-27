import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const DictaPhone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ pauseOnRecognitionEnd: false });

  return (
    <div className='bg-primary'>
      <p>Microphone: {listening ? "On" : "Off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      {console.log(transcript)}
      
      <p>{transcript}</p>
    </div>
  );
};

export default DictaPhone;
