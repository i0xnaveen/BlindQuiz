import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getAllQuestion } from '../service/QuizService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const FetchQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [redirect, setRedirect] = useState('');
  const[selectedOption,setSelectedOption]=useState('');
  const [page,setPage]=useState(false);
  const [quizEnd,setQuizzEnd]=useState(false);
  const navigate=useNavigate();
  const passages=["Please choose the option a or b or c or d","Moving to the nextQuestions"]
  let marks=0;
  let index=1;
const rollno=localStorage.getItem('registerno')
  const commands = [
    {
      command: ['start the *'],
      callback: (redirect) => setRedirect(`start the ${redirect}`),
    },
    {
      command: ['option *'],
      callback: (selectedOption) => handleSelectOption(selectedOption),
    },
  ];
  const options=["a","b","c","d","A","B","C","D"];
  
  const handleSelectOption = (selectedOption) => {
  if(!options.includes(selectedOption)){
    const synth=window.speechSynthesis;
    const  uttererror=new SpeechSynthesisUtterance(passages[0]);
    synth.speak(uttererror);
    setSelectedOption('');
    
  }else{
    const uttersuccess=new SpeechSynthesisUtterance(passages[1]);
    handleEnd(currentPage);
    window.speechSynthesis.speak(uttersuccess);
    setSelectedOption(selectedOption.toUpperCase()); // Convert to lowercase
    checkAnswer(selectedOption.toUpperCase());
    
    setTimeout(()=>{
      handleNextPage()
    },3000)
  }
  };
  const checkAnswer=(selectedOption)=>{
    if(selectedOption===questions[currentPage].correctAnswers){
      marks+=1;
      console.log(marks);
    }

  }
  
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    fetchAllQuestion();
    startListening();
    
    return () => {
      stopListening(); 
  };
  }, []);
  const handlemarks=()=>{
    marks=0;
  }
  useEffect(() => {
    if (redirect === 'start the test') {
      setTimeout(() => {
        playTheQuestion(currentPage);
      }, 3000);
    }
    handlemarks();

  }, [redirect]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser doesn't support speech recognition. Please use a compatible browser.</p>;
  }

  const fetchAllQuestion = async () => {
    try {
      const data = await getAllQuestion();
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setSelectedOption('');
    setTimeout(() => {
      playTheQuestion(currentPage + 1);
    }, 4000);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
    setSelectedAnswer(null);
  };

  const speak = () => {
    const synth = window.speechSynthesis;
    const text = "The 4 Options are";
    const questionUtterance = new SpeechSynthesisUtterance(text);
    questionUtterance.rate = 2.4;
    synth.speak(questionUtterance);
  };


  const playTheQuestion = (currentPage) => {

    SpeechRecognition.stopListening();
    console.log(questions.length);
    resetTranscript();
    console.log(transcript);
    if (questions.length > 0 && currentPage < questions.length) {
      const quizaudio = questions[currentPage].questions;
      const quizoptions = questions[currentPage].choices.map((choice) => "option" + choice);
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(quizaudio);
      const utchoice = new SpeechSynthesisUtterance(quizoptions);
      utterance.rate = 2.4;
      utchoice.rate = 2.4;
      utterance.onend = (event) => {
        speak();
        speakOptions(0);
      };
      synth.speak(utterance);
      

    
      const speakOptions = (index) => {
        if (index < quizoptions.length) {
          utchoice.text = quizoptions[index];
          utchoice.onend = (event) => {
            speakOptions(index + 1);
          };
          synth.speak(utchoice);
          setRedirect('');
        } else {
          startListening(); 
          
          
        }
      };
    }
  };


  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };
  const handleEnd = async (currentPage) => {
    console.log(currentPage);
    if (currentPage === questions.length-1) { 
      console.log("ended");
      setQuizzEnd(true);
      try {
        const res =await axios.post("http://localhost:9192/api/quizzes/addMarks", {
          rollno: rollno,
          marks: marks
        });
      } catch (err) {
        console.log(err);
      }
  
      navigate('/thankYou');
    }
  };
  
  return (
    <section className="container-fluid bg-dark  p-4" style={{ height: '500px' }}>
    <div>
      <h4 className='text-light'>{`${currentPage + 1}. ${questions[currentPage]?.questions}`}</h4>
      {questions[currentPage]?.choices.map((choice, i) => (
        <div key={i} className="mt-3">
          <input
            type="radio"
            id={`choice-${i}`}
            name="choices"
            value={i}
            checked={selectedAnswer === i}
          />
          <label className="text-light" htmlFor={`choice-${i}`}>{` ${choice}`}</label>
        </div>
      ))}
    </div>
    <div className="mt-4">
      <button className="btn btn-secondary mr-2" onClick={handlePreviousPage} disabled={currentPage === 0}>
        Previous
      </button>
      <button className="btn btn-secondary mr-2" onClick={() => handleNextPage()} disabled={currentPage === questions.length - 1}>
        Next
      </button>
      <button className="btn btn-danger mr-2" onClick={resetTranscript}>Reset</button>
      <button className="btn btn-success mr-2" onClick={startListening}>Start Listening</button>
      <button className="btn btn-warning" onClick={stopListening}>Stop Listening</button>
    </div>
    <div className="mt-4">
      <div className="text-light">Transcript: {transcript}</div>
      <div className="text-light">Selected Answer: {selectedOption !== null ? selectedOption : 'None'}</div>
    </div>
  </section>
);
};
export default FetchQuiz;
