import TodoListPage from './pages/TodoListPage'
import ProfilePage from './pages/ProfilePage'
import { useNavigate, Routes, Route } from 'react-router-dom';
import AsideMenu from './components/AsideMenu';
import './App.css'; 
import RegistrationPage from './pages/RegistrationPage'
import AuthorizationPage from './pages/AuthorizationPage'
import { useEffect } from 'react';
import { refreshToken } from './api/users'
import { selectIsAuthorized } from './store/authSelectors';
import { useSelector } from "react-redux"

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
      <div className='app'>
        { isAuthorized ? <AsideMenu /> : ''}
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/authorization" element={<AuthorizationPage />} />
        </Routes>
      </div>
  )
}

export default App
