import { useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export const RequestInterceptor = () => {
    const { accessToken } = useAuth();

    useEffect(() => {
        const id = api.interceptors.request.use((config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        return () => api.interceptors.request.eject(id);
    }, [accessToken]);

    return null;
};
