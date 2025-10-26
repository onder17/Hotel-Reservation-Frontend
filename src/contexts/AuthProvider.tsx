import { AuthContext } from "@/context/AuthContext";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const refreshToken = async () => {
        try {
            const res = await api.get('/auth/refresh-token');
            setAccessToken(res.data.accessToken);
        } catch {
            setAccessToken(null);
        }
    };

    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};