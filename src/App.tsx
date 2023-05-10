import React, {  useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Groups from './pages/Groups';
import Group from './pages/Group';
import User from './pages/User';
import Users from './pages/Users';
import Assignment from './pages/Assignment';
import AddUser from './pages/AddUser';
import AddAssignment from './pages/AddAssignment';
import Profile from './pages/Profile';
import AddGroup from './pages/AddGroup';
import UpdateUser from './pages/UpdateUser';
import UpdateAssignment from './pages/UpdateAssignment';
import { ContextType } from '../src/types';

import { AppContext } from './AppContext';
const PrivateRoute = ({pageComponent} : any) => {
  const { user } = useContext(AppContext) as ContextType;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user.id)
    if(!user.id ) {
      navigate('/')
    }
  }, )
  return pageComponent;
}
function App() {

  return (
    <Routes>
      {/* public routes  */}
      <Route path="/" element={<Login />} />
      {/* All private routes */}
      <Route
            path="/home"
            element={<PrivateRoute pageComponent={<Home />} />}
          />
        
        <Route
            path="/groups"
            element={<PrivateRoute pageComponent={<Groups />} />}
          />
      {/* <Route path="/home" element={<Home />} /> */}

      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:groupId" element={<Group />} />
      <Route path="/groups/new" element={<AddGroup />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:userId" element={<User />} />
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
