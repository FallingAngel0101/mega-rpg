import React from 'react';
import Navbar from "./components/navbar/Navbar";
import MainPage from './pages/mainpage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePerson from './pages/createPerson/CreatePerson';
import { CardProvider } from './components/CardContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <CardProvider>
          <Navbar />
          <Routes>
            <Route path='*' element={<MainPage />} />
            <Route path='/create' element={<CreatePerson />} />
          </Routes>
        </CardProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;