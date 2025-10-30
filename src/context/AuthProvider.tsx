import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });

    axiosInstance.interceptors.request.use((config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    const refreshToken = (): Promise<string> => {
        return axiosInstance
            .get('/auth/refresh-token')
            .then((res) => {
                const token = res.data.accessToken;
                setAccessToken(token);
                return token;
            })
            .catch((error) => {
                setAccessToken(null);
                throw error;
            });
    };

    const login = async (data: LoginRequest) => {
        return axiosInstance
            .post('/auth/login', data)
            .then((res) => {
                const token = res.data.accessToken;
                setAccessToken(token);
                return token;
            })
            .catch((error) => {
                setAccessToken(null);
                throw error;
            });
    };

    const register = (data: RegisterRequest): Promise<string> => {
        return axiosInstance
            .post('/auth/register', data)
            .then((res) => {
                const token = res.data.accessToken;
                setAccessToken(token);
                return token;
            })
            .catch((error) => {
                setAccessToken(null);
                throw error;
            });
    };

    const logout = (): Promise<void> => {
        return axiosInstance
            .post('/auth/logout')
            .then(() => setAccessToken(null))
            .catch((error) => {
                setAccessToken(null);
                throw error;
            });
    };

    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};