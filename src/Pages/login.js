import React, { useState } from 'react';
import '../css/login.css';
import { checkUser } from '../service/QuizService';
import axios from 'axios';


const Login = () => {
  const [registerno, setRegisterno] = useState('');
  const [dob, setDob] = useState('');
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const [option, setOption] = useState('userLogin');
  
  

  const registerHandle = (e) => {
    setRegisterno(e.target.value);
  }

  const dobHandle = (e) => {
    setDob(e.target.value);
  }

  const loginsubmitClick = async (e) => {
    e.preventDefault();
  
    const loginData = {
      username: username,
      password: passwd,
    };
  
    try {
      // Encode the credentials to Base64
      const base64Credentials = btoa(`${loginData.username}:${loginData.password}`);
  
      // Set up the headers with the Authorization header
      const headers = {
        Authorization: `Basic ${base64Credentials}`,
        'Content-Type': 'application/json',
      };
  
      // Make an HTTP POST request to the login endpoint
      const response = await axios.get(
        'http://localhost:9192/api/quizzes/all-question',
        {},
        { headers }
      );
  
      
      console.log('Login successful', response);
  
      if (response.status === 200) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        window.location.href = 'http://localhost:3000/adminpage';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('Error during login. Please try again.');
    }
  };
    
const submitClick=async()=>{
  const users={rollNo:registerno,
    dob:dob,
     marks:0};
  const boo=await checkUser(users);
  if(boo){
    localStorage.setItem("IsUserLogin","true");
    localStorage.setItem("registerno",registerno);
    window.location.href="http://localhost:3000/intro";
  }
 
}
  const optionSelect = (selectedOption) => {
    setOption(selectedOption);
  }

  const adminUserClick = (e) => {
    setUsername(e.target.value);
  }

  const passwdClick = (e) => {
    setPasswd(e.target.value);
  }

  return (
    <div className="d-flex mx-auto  align-items-center ">
    <div className="container mt-5 d-flex justify-content-center   ">
      <div className="card w-50">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${option === 'userLogin' ? 'active' : ''}`}
                onClick={() => optionSelect('userLogin')}
              >
                User Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${option === 'adminLogin' ? 'active' : ''}`}
                onClick={() => optionSelect('adminLogin')}
              >
                Admin Login
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {option === "userLogin" && (
            <div className='login-page'>
              <form className='login-form'>
                <div className='mb-3'>
                  <label htmlFor='RegisterNo' className='form-label'>Registration Number</label>
                  <input type="text" className="form-control" id='RegisterNo' value={registerno} onChange={registerHandle} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='dob' className='form-label'>Date of Birth</label>
                  <input type="date" className="form-control" id='dob' value={dob} onChange={dobHandle} />
                </div>
                <button className="btn btn-primary" type='submit' onClick={submitClick}>Submit</button>
              </form>
            </div>
          )}

          {option === "adminLogin" && (
            <div className='login-page'>
              <form className='login-form'>
                <div className='mb-3'>
                  <label htmlFor='AdminName' className='form-label'>Admin UserName :</label>
                  <input type="text" className="form-control" id='RegisterNo' value={username} onChange={adminUserClick} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='Password' className='form-label'>Password :</label>
                  <input type="password" className="form-control" id='password' value={passwd} onChange={passwdClick} />
                </div>
                <button className='btn btn-primary' type='submit' onClick={loginsubmitClick}>Submit</button>
                
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
export default Login;
