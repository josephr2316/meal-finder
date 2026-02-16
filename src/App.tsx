
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MealDetailPage from './pages/MealDetailPage'
import './App.css'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/meal/:id" element={<MealDetailPage/>} />
    </Routes>
  )
}
