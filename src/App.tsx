
import  Nav  from './pages/Nav'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components.tsx/Login'
import Register from './components.tsx/Register'
import Statistics from './pages/Statistics'
import Votes from './pages/Votes'

function App() {


  return (
    <div className="App">
      <Nav/>
      <div className="body">
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="statistics" element={<Statistics/>} />
        <Route path="votes" element={<Votes/>} />           
      </Routes>
      </div>

    </div>
  )
}

export default App
