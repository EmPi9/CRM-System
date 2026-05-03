import axios from 'axios';
import { tokenManager } from '../helper/tokenManager';
import { selectIsAuthorized } from '../store/authSelectors';
import { useSelector } from "react-redux"
import { UserRegistration } from '../types/users.models.types'

const API_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_BASE + '/api/v1' 
  : '/api/v1';

interface UserAuthorization { 
  login: string; 
  password: string;
}

const accessToken = tokenManager.getAccessToken();

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
});

apiClient.interceptors.request.use(config => {
    const accessToken = tokenManager.getAccessToken();
    
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

apiClient.interceptors.response.use(
    res => res,
    async error => {
        const original = error.config;

        if(error.response?.status === 401 && !original._retry){
            original._retry = true

            try {
                const isAuthorized = useSelector(selectIsAuthorized);

                if(isAuthorized === false){
                    throw new Error('Нет рефреш токена');
                }

                const { data } = await axios.post(
                    '/auth/refresh',
                    { refreshToken }
                )

                tokenManager.setAccessToken(data.accessToken);
                tokenManager.setRefreshToken(data.refreshToken);

                original.headers.Authotization = `Bearer ${data.accessToken}`;
                return apiClient(original);
                
            } catch {
                tokenManager.clearToken();
                

                return Promise.reject(error); 
            }
        }
        return Promise.reject(error);
    }
)


export async function registerUser(
    login: string, 
    username: string, 
    password: string, 
    email: string,
    phoneNumber?: string 
) {
    const payload: UserRegistration = {
        login,
        username,
        password,
        email,
        phoneNumber
    };

    const response = await apiClient.post(
        '/auth/signup',
        payload
    )

    return response.data
}

export async function authorizeUser (
    login: string, 
    password: string, 
) {
    const payload: UserAuthorization = {
        login,
        password
    };

    const response = await apiClient.post(
        '/auth/signin',
        payload
    )

    return response.data

}

export default async function getUserProfile() {

    const response = await apiClient.get(
        '/user/profile',
    )

    return response.data
}

export async function refreshToken() {

    const refreshToken = tokenManager.getRefreshToken();

    await apiClient.post(
        '/auth/refresh',
        { refreshToken }
    )

    return
}

export async function logout() {

    const response = await apiClient.post(
            '/user/logout',
        )

    return response.data

}