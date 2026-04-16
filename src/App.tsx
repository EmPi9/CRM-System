import TodoListPage from './pages/TodoListPage'
import ProfilePage from './pages/ProfilePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import AsideMenu from '../src/components/AsideMenu';
import RegistrationPage from './pages/RegistrationPage'
import AuthorizationPage from './pages/AuthorizationPage'

function App() {

  return (
      <Router>
      <div>
        <AsideMenu />
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/authorization" element={<AuthorizationPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
