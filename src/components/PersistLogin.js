import React, {useContext, useState} from 'react';
import AuthContext from '../contexts/AuthProvider.js';

export default function PersistLogin() {
    const [isLoading, setLoading] = useState(true);
    const {auth} = useContext(AuthContext);

  return (
    <div>PersistLogin</div>
  )
}
