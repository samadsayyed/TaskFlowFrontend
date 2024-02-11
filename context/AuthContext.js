// context/AuthContext.js
import { createContext } from 'react';

export const AuthContext = createContext({isAuthenticated:false});

export default AuthContext;
