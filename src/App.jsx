import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import bookLogo from './assets/books.png';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import Navigations from './components/Navigations';

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>
        <img id='logo-image' src={bookLogo} alt="Library Logo"/> BookBuddy
      </h1>

      <Router>
        <Navigations />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/book/:bookId" element={<SingleBook token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/account" element={<Account token={token} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
