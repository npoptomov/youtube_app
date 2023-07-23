// App.js
import './App.css';
import Dashboard from './pages/Dashboard';
import VideoDetails from './pages/VideoDetails';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthWrapper from './components/AuthWrapper';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          } />
          <Route path="/dashboard" element={
            <AuthWrapper>
              <Dashboard />
            </AuthWrapper>
          } />
          <Route path="/videos/:id" element={
            <AuthWrapper>
              <VideoDetails />
            </AuthWrapper>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
