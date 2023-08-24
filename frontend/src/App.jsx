import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
/*PAGES*/
import DetailPage from './pages/DetailPage';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';

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
      </Routes>
    </BrowserRouter>
  );
}

