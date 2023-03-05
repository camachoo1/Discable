import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import ServerNavBar from './components/ServerNavBar';
import ServerShowPage from './components/ServerShowPage';
import SignupFormPage from './components/SignupForm';
import SplashPage from './components/SplashPage';
import UserShowPage from './components/UserShowPage';
import BottomPanel from './components/UserShowPage/BottomPanel';
import ErrorPage from './components/ErrorPage';

// export const ModalContext = createContext();

const App = () => {
  // const [open, setOpen] = useState(false);
  // const [deleteForm, setDeleteForm] = useState(false);
  // const [edit, setEdit] = useState(false);
  // const [leave, setLeave] = useState(false);
  // const [editChannel, setEditChannel] = useState(true);
  // const [formType, setFormType] = useState('server');
  return (
    <div className='app'>
      {/* <ModalContext.Provider
        value={{
          open,
          setOpen,
          deleteForm,
          setDeleteForm,
          edit,
          setEdit,
          leave,
          setLeave,
          editChannel,
          setEditChannel,
          formType,
          setFormType,
        }}
      > */}
      <ServerNavBar />
      <BottomPanel />
      <Routes>
        <Route exact path='/' element=<SplashPage /> />
        <Route exact path='/login' element=<LoginFormPage /> />
        <Route exact path='/register' element=<SignupFormPage /> />
        <Route exact path='/@me' element=<UserShowPage /> />
        <Route
          exact
          path='/servers/:serverId/channels/:channelId'
          element=<ServerShowPage />
        />
        <Route
          exact
          path='/servers/:serverId'
          element=<ServerShowPage />
        />
        <Route exact path='/error' element=<ErrorPage /> />
        <Route
          path='/error'
          render={() => <Navigate to='/error' />}
        />
      </Routes>
      {/* </ModalContext.Provider> */}
    </div>
  );
};

export default App;
