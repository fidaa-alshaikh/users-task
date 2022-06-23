import React, {useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/AuthProvider.js';

export default function ProtectedRoute() {
    const {auth} = useContext(AuthContext);
  return (
    auth?
    <Outlet/>
    :
    <Navigate to="/login" />
  )
}
