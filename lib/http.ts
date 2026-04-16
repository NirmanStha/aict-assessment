import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";
const isBrowser = typeof window !== "undefined";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Response interceptor to handle 401 errors and attempt token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const body = {
          expiresInMins: 30,
        };

        const refreshResponse = await axios.post(
          isBrowser ? "/api/auth/refresh" : `${baseURL}/auth/refresh`,
          body,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        if (!refreshResponse.data) {
          return Promise.reject(error);
        }

        return api(originalRequest as AxiosRequestConfig);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
