import React, { useEffect, useState } from "react"

import { Link,useNavigate } from "react-router-dom"
import { createQuestion, getSubjects } from "../service/QuizService"

const AddQuestion = () => {
	const navigate=useNavigate();
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  if (!isAdminAuthenticated) {
   navigate('/');
  }
	const [question, setQuestionText] = useState("")
	
	const [choices, setChoices] = useState(["A."])
	const [correctAnswers, setCorrectAnswers] = useState("")
	

	const handleAddChoice = () => {
		const lastChoice = choices[choices.length - 1]
		const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
		const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
		const newChoice = `${newChoiceLetter}.`
		setChoices([...choices, newChoice])
	}

	const handleRemoveChoice = (index) => {
		setChoices(choices.filter((choice, i) => i !== index))
	}

	const handleChoiceChange = (index, value) => {
		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
	}

	const handleAddCorrectAnswer = (e) => {
		setCorrectAnswers(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
	  
		try {
			if (!question || !correctAnswers) {
				console.error("Question and correctAnswers must not be empty.");
				return;
			}
	  
			if (!choices || choices.length === 0) {
				console.error("Choices list must not be empty.");
				return;
			}
	  
			const result = {
				questions: question,
				choices: choices,
				correctAnswer: correctAnswers
			};
	  
			await createQuestion(result);
	  
			setQuestionText("");
			setChoices([""]);
			setCorrectAnswers("");
	  
		} catch (error) {
			console.error("Error in creating question", error);
		}
	};
	


	return (
		<div className="container-fluid p-3"style={{background:"#222222",marginTop:""}}>
  <div class="d-flex align-items-center justify-content-center"  >
				<div className="col-md-6  ">
					<div className="card">
						<div className="card-header">
							<h5 className="card-title">Add New Questions</h5>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit} className="p-2">
								
								<div className="mb-3">
									<label htmlFor="question-text" className="form-label text-info">
										Question
									</label>
									<textarea
										className="form-control"
										rows={4}
										value={question}
										onChange={(e) => setQuestionText(e.target.value)}></textarea>
								</div>
								
								<div className="mb-3">
									<label htmlFor="choices" className="form-label text-primary">
										Choices
									</label>
									{choices.map((choice, index) => (
										<div key={index} className="input-group mb-3">
											<input
												type="text"
												value={choice}
												onChange={(e) => handleChoiceChange(index, e.target.value)}
												className="form-control"
											/>
											<button
												type="button"
												onClick={() => handleRemoveChoice(index)}
												className="btn btn-outline-danger">
												Remove
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={handleAddChoice}
										className="mr-5 btn btn-outline-primary">
										Add Choice
									</button>
								</div>
								
									<div className="mb-3">
										<label htmlFor="answer" className="form-label text-success">
											Correct Answer
										</label>
										<input
											type="text"
											className="form-control mb-3"
											id="answer"
											value={correctAnswers}
											onChange={handleAddCorrectAnswer}
										/>
                                       
									</div>
								
							

								{!correctAnswers.length && <p>Please enter at least one correct answer.</p>}

								<div className="btn-group">
									<button type="submit" className="btn btn-outline-success mr-2">
										Save Question
									</button>
									<Link to={"/Getallquiz"} className="btn btn-outline-primary ml-2">
										Back to existing questions
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddQuestion