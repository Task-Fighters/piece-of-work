import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Groups from './pages/Groups';
import Users from './pages/Users';
import Assignment from './pages/Assignment';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/users" element={<Users />} />
      <Route path="/assignment/:assignmentId" element={<Assignment />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
