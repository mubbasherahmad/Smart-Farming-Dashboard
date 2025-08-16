import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import SensorPage from './pages/SensorPage';
import IrrigationPage from './pages/IrrigationPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/sensors" element={<SensorPage />} />
        <Route path="/irrigation" element={<IrrigationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
