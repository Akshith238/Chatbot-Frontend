import './App.css';
import 'aos/dist/aos.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Inspect from './components/Inspect';
import Document from './components/Document';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route
            exact
            index
            path="/"
            element={<div className="h-screen"><SignIn /></div>}
          />
          <Route path='/inspect' element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
