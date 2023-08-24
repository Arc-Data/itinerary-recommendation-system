import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
/*PAGES*/
import LandingPage from './pages/LandingPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import Sign from './pages/Sign';



 // const [popular, setPopular] = useState()
  
  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/popular/')
  //   .then(response => response.json())
  //   .then(data => setPopular(data))
  // }, [])

  // console.log(popular)

export default  function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detailPage" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  );
}

