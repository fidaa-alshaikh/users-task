import React, {useState, useEffect} from 'react';
import './App.css';
import './test.php';

import {
  Routes,
  Route,
  Router,
  Navigate
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllUsers from './pages/AllUsers';
import ViewEditUser from './pages/ViewEditUser';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';

function App() {

  const [data, newData] = useState(null);

  useEffect(() => {
    fetch('http://localhost/users-task/src/test.php')
      .then((response) => response.text())
      .then((response) => newData(response));
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <Header/>
      <Routes>
        <Route name="home" exact path="/" element={<Home/>} />

        <Route name="login" path="login" element={<Login/>} />
        <Route name="register" path="register" element={<Register/>} />

        <Route name="all-users" path="all-users" element={<AllUsers/>} />
        <Route name="view-edit-users" path="edit/id" element={<ViewEditUser/>} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
      <Footer/>

    </div>
  );
}

export default App;
