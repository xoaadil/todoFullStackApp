// App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function AppWrapper() {
  const location = useLocation();
  const path = location.pathname;

  // Show this layout only on /login or /signup
  const showAuthLayout = path === '/login' || path === '/signup';

  return (
    <>
      {showAuthLayout ? (
        <div className="container">
          <h1 className="text-center">Todo App</h1>
          <hr id="underline" />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
   
      <AppWrapper />
  );
}
