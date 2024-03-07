import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './Pages/login';
import Question from './Pages/question';
import Intro from './Pages/intro';
import Quiz from './Pages/quiz';

import AddQuiz from './question/AddQuestion'
import GetAllQuiz from './question/GetAllQuiz';
import FetchQuiz from './quiz/fetchQuiz';

import AdminPage from './Pages/adminPage';
import ThankYou from './quiz/thankYou';
import UpdateQuiz from './question/UpdateQuiz';

const router=createBrowserRouter([
  {
    path:'/',
    element:<Login></Login>
  },
  {
    path:'/question',
    element:<Question></Question>
  },
  {
    path:'/quiz',
    element:<Quiz></Quiz>
  },
  {
    path:'/intro',
    element:<Intro></Intro>
  },
  {
    path:'/Addquiz',
    element:<AddQuiz></AddQuiz>
  },{
    path:'/Getallquiz',
    element: <GetAllQuiz></GetAllQuiz>
  },
  {
    path:'/fetchquiz',
    element:<FetchQuiz></FetchQuiz>
  },
  
  {
    path:'/adminpage',
    element:<AdminPage></AdminPage>
  }
  ,{
    path:'/thankyou',
    element:<ThankYou></ThankYou>
  },{
    path:'/updateQuiz/:id',
    element:<UpdateQuiz></UpdateQuiz>
  }
])
function App() {
  return (
    
    <RouterProvider router={router}/>
  
   
  );
}

export default App;
