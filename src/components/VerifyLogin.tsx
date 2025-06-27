import type { JSX } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element
}

interface TokenPayload {
  exp: number; // timestamp da expiração
}

export default function VerifyLogin({children}: Props){
    const token = localStorage.getItem('token')
    if(!token) {
        return <Navigate to="/" />
    }

    try {
        const { exp } = jwtDecode<TokenPayload>(token);
        if (Date.now() >= exp * 1000) {
        // token expirou
        localStorage.removeItem('token');
        return <Navigate to="/" />;
        }
    } catch {
        // token inválido ou mal formado
        localStorage.removeItem('token');
        return <Navigate to="/" />;
    }

    return children
}