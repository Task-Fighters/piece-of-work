import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Groups from './pages/Groups';
import Group from './pages/Group';
import Users from './pages/Users';
import Assignment from './pages/Assignment';
import AddUser from './pages/AddUser';
import AddAssignment from './pages/AddAssignment';
import Profile from './pages/Profile';
import AddGroup from './pages/AddGroup';
import UpdateUser from './pages/UpdateUser';
import UpdateAssignment from './pages/UpdateAssignment';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:groupId" element={<Group />} />
      <Route path="/groups/new" element={<AddGroup />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:userId" element={<Profile />} />
      <Route path="/users/:userId/update" element={<UpdateUser />} />
      <Route path="/users/new" element={<AddUser />} />
      <Route path="/assignments/:assignmentId" element={<Assignment />} />
      <Route
        path="/assignments/:assignmentId/update"
        element={<UpdateAssignment />}
      />
      <Route path="/assignments/new" element={<AddAssignment />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
