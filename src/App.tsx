import TodoListPage from './pages/TodoListPage'
import ProfilePage from './pages/ProfilePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AsideMenu from './components/AsideMenu';
import './App.css'; 

function App() {

  return (
      <Router>
      <div className='app'>
        <AsideMenu />
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
