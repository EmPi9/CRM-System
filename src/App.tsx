import TodoListPage from './pages/TodoListPage'
import ProfilePage from './pages/ProfilePage'
import { useNavigate, Routes, Route } from 'react-router-dom';
import AsideMenu from './components/AsideMenu';
import './App.css'; 
import RegistrationPage from './pages/RegistrationPage'
import AuthorizationPage from './pages/AuthorizationPage'
import UsersPage from './pages/UsersPage'
import { useEffect } from 'react';
import { refreshToken } from './api/users'
import { selectIsAuthorized } from './store/authSelectors';
import { useSelector } from "react-redux"
import { ProfileUserPage } from './pages/ProfileUserPage';
import { Flex } from 'antd';

function App() {
  
  const navigate = useNavigate();
  const isAuthorized = useSelector(selectIsAuthorized);
    
  useEffect(() => {
    const checkAuth = async () => {
    
        if(isAuthorized === false) {
          navigate('/authorization')
          return
        }

        await refreshToken();
    }

    checkAuth();
  }, [])

  return (
      <Flex justify={isAuthorized ? '' : 'center'} gap={isAuthorized ? 102 : ''}>
        { isAuthorized ? <AsideMenu /> : ''}
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/authorization" element={<AuthorizationPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/edit/:id" element={<ProfileUserPage />} /> 
        </Routes>
      </Flex>
  )
}


export default App
