import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import getQuizById, { updateQuestion } from '../service/QuizService'

const UpdateQuiz = () => {
    useEffect(()=>{
        fetchQuestion();
    },[])
    const [question,setQuestion]=useState("");
    const [choices,setChoices]=useState([""]);
    const [correctAnswer,setCorrectAnswers]=useState("");
       const {id}=useParams();
       const fetchQuestion=async()=>{
        try{
        const updateQuestion=await getQuizById(id);
        if(updateQuestion){
            setQuestion(updateQuestion.question)
            setChoices(updateQuestion.choices)
            setCorrectAnswers(updateQuestion.correctAnswers)
        }
        }
        catch(err){
            console.log(err);
        }

       }
       const handleQuestionChange=(e)=>{
        setQuestion(e.target.value)
       }
       const handleChoiceChange=(index,e)=>{
        const updatedChoices=[...choices];
        updatedChoices[index]=e.target.value;
        setChoices(updatedChoices);
       }
       const handlecorrectAnswer=(e)=>{
        setCorrectAnswers(e.target.value);
       }
       const handleQuestionUpdate=async(e)=>{
        e.preventDefault()
        try{
            const updatedQuestion={
                question,
                choices,
                correctAnswer
            }
           await updateQuestion(id,updatedQuestion);
        }
        catch(error){
          console.log(error);
        }
       }
  return (
   <section className='container-fluid'>
    <h4 className='mt-5' style={{color:"GrayText"}}>UpdateQuiz</h4>
    <div className='col-md-8'>
        <form onSubmit={handleQuestionUpdate}>
            <label htmlFor="question">Question: </label><br/>
            <textarea className='form-control'
            rows={4}
             value={question}
             onChange={handleQuestionChange}/>
             <br/><br/>
             <div className='form-group'>
                <label htmlFor='choice'>Choices: </label><br/>
                {choices.map((choice,i)=>(
                    <input key={i} type='text' 
                     className='form-control mb-4'   
                      value={choice} 
                      onChange={(e)=>handleChoiceChange(i,e)}/>
                ))}
             </div>
             <div className='form-group'>
                <label htmlFor="answer">Answer:</label><br/>
                <input type="text" value={correctAnswer}
                className='form-control mb-4'
                onChange={handlecorrectAnswer}/>
             </div>
             <div className='btn-group'>
                <button type='submit' className='btn btn-sm btn-outline-warning'>Update Question</button>
             </div>
        </form>
    </div>

   </section>
  )
}

export default UpdateQuiz