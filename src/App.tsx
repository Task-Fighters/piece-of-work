import { useContext } from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
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
import secureLocalStorage from 'react-secure-storage';
import { ContextType } from '../src/types';
import { AppContext } from './AppContext';
// import secureLocalStorage from 'react-secure-storage';

// import { AppContext } from './AppContext';
// const PrivateRoute = ({ pageComponent }: any) => {
//   const { user } = useContext(AppContext) as ContextType;
//   const navigate = useNavigate();
//   let localUserId = secureLocalStorage.getItem('id');

//   useEffect(() => {
//     if (!user.id && !localUserId) {
//       navigate('/');
//     }
//   });
//   return pageComponent;
// };

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useContext(AppContext) as ContextType;
  const location = useLocation();
  const localUserRole = secureLocalStorage.getItem('role');
  //@ts-ignore
  return allowedRoles.includes(localUserRole) && user.id ? (
    <Outlet />
  ) : localUserRole ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute allowedRoles={['pgp', 'admin']} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assignments/:assignmentId" element={<Assignment />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:groupId" element={<Group />} />
        <Route path="/groups/new" element={<AddGroup />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/users/:userId/update" element={<UpdateUser />} />
        <Route path="/users/new" element={<AddUser />} />
        <Route
          path="/assignments/:assignmentId/update"
          element={<UpdateAssignment />}
        />
        <Route path="/assignments/new" element={<AddAssignment />} />
      </Route>
    </Routes>
  );
}

export default App;
