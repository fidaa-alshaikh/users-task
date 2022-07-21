import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import {
  Routes,
  Route} from 'react-router-dom';
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
import AddUser from './pages/AddUser';
import MyProfile from './pages/MyProfile';

import jwt_decode from "jwt-decode";


function App() {

 
  const {setAuth} = useContext(AuthContext);
  const [dataLoading, setDataLoading] = useState(false);


  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "FIDAA").data;
      setAuth({currentUser });
    } else {
      setAuth(null);
    }

    setDataLoading(true)
 
  };
 


  useEffect(userLogin, 
    [setAuth]
    );

  return (
    <div >
      { dataLoading &&
      <>
      <Navbar loginCallback= {userLogin}/>
      <Header/>
      <Routes>
        <Route name="home" exact path="/" element={<Home />} />

        <Route name="login" path="login" element={<Login loginCallback= {userLogin}/>} />
        <Route name="register" path="register" element={<Register />} />
        
        {/* Only viewed by login users */}
        <Route name="outlet" path="/" element={<ProtectedRoute />} >
        <Route name="my-profile" path="my-profile" element={<MyProfile />} />
        <Route name="all-users" path="all-users" element={<AllUsers />} />
        <Route name="add-user" path="all-users/add-user" element={<AddUser />} />
        <Route name="view-edit-users" path="all-users/user/:id/edit" element={<ViewEditUser />} />
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
