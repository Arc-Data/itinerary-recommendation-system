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
<<<<<<< HEAD
        <Route path="/" element={<LandingPage />} />
=======
        <Route index path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
>>>>>>> b1cec8f0594caf4ae4712b63b7aede601b9388d7
        <Route path="/detailPage" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

