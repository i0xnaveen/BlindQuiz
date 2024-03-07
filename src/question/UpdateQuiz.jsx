import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById, updateQuestion } from '../service/QuizService';
import './UpdateQuiz.css'; // Import your custom CSS file

const UpdateQuiz = () => {
  const { id } = useParams();
  const [questions, setQuestion] = useState('');
  const [choices, setChoices] = useState(['']);
  const [correctAnswer, setCorrectAnswers] = useState('');

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const updatedQuestion = await getQuizById(id);
      console.log("Updated Question:", updatedQuestion);
      if (updatedQuestion) {
        setQuestion(updatedQuestion.questions);
        setChoices(updatedQuestion.choices);
        setCorrectAnswers(updatedQuestion.correctAnswer);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswer = (e) => {
    setCorrectAnswers(e.target.value);
  };

  const handleQuestionUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        questions,
        choices,
        correctAnswer,
      };
      await updateQuestion(id, updatedQuestion);
      alert("Your question has been successfully updated!");
      window.location.href = "http://localhost:3000/adminpage";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Update Quiz</h5>
              <form onSubmit={handleQuestionUpdate}>
                <div className="mb-3">
                  <label htmlFor="question" className="form-label">
                    Question:
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={questions}
                    onChange={handleQuestionChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="choices" className="form-label">
                    Choices:
                  </label>
                  {choices.map((choice, i) => (
                    <input
                      key={i}
                      type="text"
                      className="form-control mb-2"
                      value={choice}
                      onChange={(e) => handleChoiceChange(i, e)}
                    />
                  ))}
                </div>
                <div className="mb-3">
                  <label htmlFor="correctAnswer" className="form-label">
                    Correct Answer:
                  </label>
                  <input
                    type="text"
                    value={correctAnswer}
                    className="form-control"
                    onChange={handleCorrectAnswer}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-warning btn-sm"
                  >
                    Update Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuiz;
