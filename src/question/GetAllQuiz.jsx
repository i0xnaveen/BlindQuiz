import React, { useEffect, useState } from 'react';
import { deleteQuestionById, getAllQuestion } from '../service/QuizService';
import { useNavigate } from 'react-router-dom';

const GetAllQuiz = () => {
    const navigate=useNavigate();
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  if (!isAdminAuthenticated) {
   navigate('/');
  }
    const [questions, setQuestions] = useState([
        { id: "", correctAnswer: "", choices: [] }
    ]);
   
    const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

    useEffect(() => {
       
        fetchAllQuestion();
        
       
    }, []);
   

    const fetchAllQuestion = async () => {
        try {
            const data = await getAllQuestion();
            setQuestions(data);
           
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleDelete = async (id) => {
        try {
            await deleteQuestionById(id);
            setQuestions(questions.filter((question) => question.id !== id));
            setDeleteSuccessMessage("Question deleted successfully");
            setIsQuestionDeleted(true);
        } catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            setDeleteSuccessMessage("");
        }, 4000);
    };
    const handleUpdate = (id) => {
        navigate(`/updateQuiz/${id}`);
      };
      

    return (
        <section className='container-fluid p-3 mb-2 bg-secondary text-white'>
            <div className='row mt-5'>
                <div className='col-md-6 mb-2 md-mb-0' style={{ color: "White" }}>
                    <h4>All Questions</h4>
                </div>
                <div className='col-md4 d-flex justify-content end'></div>
            </div>
            <hr />
            {isQuestionDeleted && <div className='alert alert-success'>{deleteSuccessMessage}</div>}
            {questions.map((question, index) => (
                <div key={index}>
                    <h4>{`${index + 1}. ${question.questions}`}</h4>
                    <ul>
                        {question.choices.map((choice, choiceIndex) => (
                            <li key={choiceIndex}>{` ${choice}`}</li>
                        ))}
                    </ul>
                    <p className='text-muted'>Correct Answer: {question.correctAnswer}</p>
                    <div className='btn-group mb-4'>
                        <button
                            className='btn btn-danger btn-sm'
                            onClick={() => handleDelete(question.id)}>
                            Delete
                        </button>
                        <button className='btn btn-primary btn-sl ms-4'onClick={()=>handleUpdate(question.id)}>Edit</button>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default GetAllQuiz;
