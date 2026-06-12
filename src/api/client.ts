import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from '../helper/tokenManager';
import { openNotification } from '../helper/notification';
import { store } from '../store';
import { logoutAuth } from '../store/authSlice'
import { refreshToken } from '../api/users'

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_BASE + '/api/v1' 
  : '/api/v1';


export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});


apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableConfig;

        if (error.code === 'ECONNABORTED' || !error.response) {
            openNotification('Ошибка', 'Сервер не отвечает. Проверьте соединение.');
            return
        }

        if (error.response.status >= 500) {
          openNotification('Ошибка', 'Ошибка на сервере. Попробуйте позже.');
          return;
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshToken();
                
                console.log(newAccessToken)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                const logout = async () => {
                  store.dispatch(logoutAuth())
                  tokenManager.clearToken()
                  window.location.replace('/authorization');
                  return
                }
              
                logout();
            }
        }

        openNotification('Ошибка', 'Неизвестная ошибка');
        return;
    }

)

apiClient.interceptors.request.use( config => {
    const accessToken = tokenManager.getAccessToken();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    console.log('Исходящие заголовки:', config.headers);
    return config
})