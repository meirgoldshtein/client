
import  Nav  from './pages/Nav'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components.tsx/Login'
import Register from './components.tsx/Register'
import Statistics from './pages/Statistics'
import Votes from './pages/Votes'
import io from 'socket.io-client';
import { useEffect } from 'react'
import { useAppDispatch } from './redux/store'
import { updateCandidates } from './redux/slices/candidateSlice'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io('http://localhost:3000'); 
    socket.on('voteUpdate', (updatedCandidate: any) => {
      dispatch(updateCandidates(updatedCandidate));
    });
  }, []);

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
