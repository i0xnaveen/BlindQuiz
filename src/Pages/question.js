import React, { useState } from 'react';

const Question = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState({
    option1: '',
    option2: '',
    option3: '',
  });
  const [content, setContent] = useState('');
  const [selectedOption, setSelectedOption] = useState('intro');

  const questiohandlechange = (e) => {
    setQuestion(e.target.value);
  };

  const contenthandlechange = (e) => {
    setContent(e.target.value);
  };

  const handleOptionChange = (optionName, e) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (selectedOption === 'intro') {
      try {
        const response = await fetch('http://localhost:3001/store-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content:content
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to store intro content');
        }

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error storing intro content:', error);
      }
    }

    if (selectedOption === 'quiz') {
      try {
        const response = await fetch('http://localhost:3001/store-question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question,
            options,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to store quiz question');
        }

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error storing quiz question:', error);
      }
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className='questions'>
        <h1 className='top-panel'>Admin Panel</h1>
        <a href='#' className='logout-link'>
          Logout
        </a>
      </div>
      <div className='side-header'>
        <div className='sidebar'>
          <div className='sidebar-ques'>
            <div className='intro' onClick={() => handleOptionClick('intro')}>
              <a href='#'>Intro Content</a>
            </div>
            <div className='line'></div>
            <div
              className='quiz-question'
              onClick={() => handleOptionClick('quiz')}
            >
              <a href='#'>Quiz Question</a>
            </div>
          </div>
        </div>
        <div className='back'>
          {selectedOption === 'intro' && (
            <form>
              <div className='intro-content'>
                <textarea
                  name="content"
                  value={content}
                  onChange={contenthandlechange}
                  className='introc'
                  placeholder='Enter your text here...'
                ></textarea>

                <div className='content-submit'>
                  <button type='submit' onClick={handleClick}>
                    Submit Intro Content
                  </button>
                </div>
              </div>
            </form>
          )}
          {selectedOption === 'quiz' && (
            <form onSubmit={handleClick}>
              <div className='ques-opt-head'>
                <h2>Enter the Question with the Options</h2>
              </div>
              <div className='quiz-input'>
                <div className='ques-input'>
                  <input
                    name="question"
                    className='ques-input-box'
                    value={question}
                    onChange={questiohandlechange}
                    placeholder='Question'
                  />
                </div>
                <div className='quiz-option'>
                  <div className='option1'>
                    <input
                      name="option1"
                      className='option'
                      value={options.option1}
                      onChange={(e) => handleOptionChange('option1', e)}
                      placeholder='Option1'
                    ></input>
                  </div>
                  <div className='option2'>
                    <input
                      name="option2"
                      className='option'
                      value={options.option2}
                      onChange={(e) => handleOptionChange('option2', e)}
                      placeholder='Option2'
                    ></input>
                  </div>
                  <div className='option3'>
                    <input
                      name="option3"
                      className='option'
                      value={options.option3}
                      onChange={(e) => handleOptionChange('option3', e)}
                      placeholder='Option3'
                    ></input>
                  </div>
                </div>
                <button type='submit'>Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
