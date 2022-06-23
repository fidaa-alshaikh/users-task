import React, {useState, useEffect, useContext} from 'react';
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
import ProtectedRoute from './components/ProtectedRoute';
import AuthContext from './contexts/AuthProvider.js';
import axios from "./services/axios.js";
function App() {

 
  const {auth, setAuth} = useContext(AuthContext);
  const [dataLoading, setDataLoading] = useState(false)
  const [inputs, setInputs] = useState([]);
  // const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });

  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
     // const currentUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ jwtToken });
      axios.get(`/edit-user.php/13`).then((response) => {
        setInputs(response.data.user);

    }).catch((err) => console.log(err));
    } else {
      setAuth(null);
    }

    setDataLoading(true)
 
  };

  useEffect(userLogin, []);
  console.log("The current User is: ", auth);

  return (
    <div >
      { dataLoading &&
      <>
      <Navbar loginCallback= {userLogin} auth={auth}/>
      <Header/>
      <Routes>
        <Route name="home" exact path="/" element={<Home/>} />

        <Route name="login" path="login" element={<Login loginCallback= {userLogin}/>} />
        <Route name="register" path="register" element={<Register/>} />

        <Route name="outlet" path="/" element={<ProtectedRoute/>} >
        <Route name="all-users" path="all-users" element={<AllUsers/>} />
        <Route name="view-edit-users" path="all-users/user/:id/edit" element={<ViewEditUser inputs={inputs}/>} />
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
      <Footer/>
      </>
}

    </div>
  );
}

export default App;
