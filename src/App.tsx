import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Groups from './pages/Groups';
import Users from './pages/Users';
import Assignments from './pages/Assignments';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/users" element={<Users />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
