import { useState } from 'react';
import './App.css';
import Images from './components/Images';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageState from './context/images/ImageState';
import Imglist from './components/Imglist';

function App() {

  const [alert, setalert] = useState(null);
  const showalert = (msg, type) => {
    setalert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }
  return (
    <>
      <ImageState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <Routes>
              <Route path="/" element={<Home showalert={showalert} />} />
              <Route path="/images" element={<Images showalert={showalert} />} />
              <Route path="/login" element={<Login showalert={showalert} />} />
              <Route path="/signup" element={<Signup showalert={showalert} />} />
              <Route path="/imagelist" element={<Imglist showalert={showalert} />} />
            </Routes>
          </Router>
        </NoteState>
      </ImageState>
    </>
  );
}

export default App;
