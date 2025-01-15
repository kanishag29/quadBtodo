import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import logo from "../images/to-do.png";
import { fontString } from 'chart.js/helpers';


const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate login by updating Redux state with email and password
    dispatch(login());
    //alert('Login Successful!');
    navigate('/tasks'); // Redirect to the To-Do page
  };

  const handleLogout = () => {
    dispatch(logout());
    alert('You have been logged out!');
    navigate('/'); // Redirect to the login page
  };

  return (
    
    <div style={styles.container}>
      
      {isAuthenticated ? (
        <div>
          
          <button  className='logout-btn' onClick={handleLogout} style={styles.button}><span>&#128274;</span>Logout</button>
        </div>
      ) : (
        <div className='landing'>
          <center>
          <img src={logo} alt='logo' className='logostyle' />
          <center><h1>Advanced To-Do Application</h1></center>
          <h3 className='h3styleinlogin'>"Organize your tasks easily Every task you complete brings you one step closer to your goals."</h3>
          <div style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleLogin} style={styles.button}><span>&#128272; </span>Login</button>
          </div>
          </center>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '10px', // Set top padding to 100px
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },

  input: {
    padding: '10px',
    margin: '10px 0',
    width: '250px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
  
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Login;
