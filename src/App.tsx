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
import AssignAssignmentToGroup from './pages/AssignAssignmentToGroup';
import secureLocalStorage from 'react-secure-storage';
import { Header } from './components/Header';
import { useContext } from 'react';
import { ContextType } from './types';
import { AppContext } from './AppContext';
import { Footer } from './components/Footer';

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  const localUserRole = secureLocalStorage.getItem('role');

  return typeof localUserRole === 'string' &&
    allowedRoles.includes(localUserRole) ? (
    <Outlet />
  ) : localUserRole ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

function App() {
  let location = useLocation().pathname.toLowerCase();
  const { user } = useContext(AppContext) as ContextType;
  const isRootPage = location === '/';
  const localUserRole = secureLocalStorage.getItem('role');

  if (isRootPage && localUserRole) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return (
    <div className="container-xl">
      {!isRootPage && <Header role={user.role} location={location} />}
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2 w-full">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute allowedRoles={['pgp', 'admin']} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:userId" element={<User />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/assignments/:assignmentId"
                element={<Assignment />}
              />
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
              <Route
                path="/assignments/:assignmentId/assign"
                element={<AssignAssignmentToGroup />}
              />
              <Route path="/assignments/new" element={<AddAssignment />} />
            </Route>
          </Routes>
        </div>
        {!isRootPage && <Footer role={user.role} image={user.imageUrl} />}
      </div>
    </div>
  );
}

export default App;
