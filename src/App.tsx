import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login'
import ChatSection from './components/ChatSection.tsx'
import Chat from './components/Chat.tsx'
import Signup from './components/SignUp.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/ChatSection' element={<ChatSection />} />
        <Route path='/Room' element={<Chat />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
