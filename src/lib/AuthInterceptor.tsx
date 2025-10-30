import { useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export const AuthInterceptor = () => {
    const { accessToken, refreshToken } = useAuth();

    useEffect(() => {
        const reqId = api.interceptors.request.use((config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        const resId = api.interceptors.response.use(
            res => res,
            async error => {
                const originalRequest = error.config;

                if (
                    (error.response?.status === 401 || // Unauthorized
                    error.response?.status === 403) && // Forbidden
                    !originalRequest._retry
                ) {
                    originalRequest._retry = true;
                    try {
                        const newToken = await refreshToken();
                        if (!newToken) throw new Error("Refresh failed");

                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(reqId);
            api.interceptors.response.eject(resId);
        };
    }, [accessToken, refreshToken]);

    return null;
};
