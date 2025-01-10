import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({children, value}) {
    return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuthValue(){
    return useContext(AuthContext)
}