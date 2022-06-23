import { createContext, useState } from "react";
// Global auth state // we need context so that we can access the auth state in multi components
const AuthContext = createContext({});
export const AuthProvider = ({children}) =>{

    const [auth, setAuth] = useState(null);

    return (
        <AuthContext.Provider value = {{auth, setAuth}}>
            {children}  
            {/* components nested inside Auth Provide*/}
        </AuthContext.Provider>
    )
}

export default AuthContext;