import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import store from './redux/store';
import TaskList from './components/TaskList';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import './App.css'
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/" />;
};
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          
          <Routes>
            {/* Login Route */}
            <Route path="/" element={<Login />} />

            {/* Protected Route for Tasks */}
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <div>
                    <TaskList />
                   
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;