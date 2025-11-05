import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Details from "./pages/Details";
import './index.css';

function App() {  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/films/:id' element={<Details />} />
      </Routes>
    </Router>
  )
}

export default App
