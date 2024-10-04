import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('myUser')) || null);
    const [userIds,setUserIds] = useState('')
    return (
        <AuthContext.Provider value={{userData, setUserData,userIds,setUserIds }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuths = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};