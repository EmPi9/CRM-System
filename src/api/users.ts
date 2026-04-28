import axios from 'axios';
import { tokenManager } from '../helper/tokenManager';
import { setAuthorized, logoutAuth } from '../store/authSlice'
import { store } from '../store';

const API_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_BASE + '/api/v1' 
  : '/api/v1';

interface UserRegistration { 
  login: string; 
  username: string; 
  password: string; 
  email: string; 
  phoneNumber?: string; 
}

interface UserAuthorization { 
  login: string; 
  password: string;
}

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
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
                const refreshToken = tokenManager.getRefreshToken();
                if(!refreshToken){
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


export async function registrationUser(
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

export async function authorizationUser (
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

    tokenManager.setAccessToken(response.data.accessToken);
    tokenManager.setRefreshToken(response.data.refreshToken);
    store.dispatch(setAuthorized(true));

    return response.data

}

export default async function getUserProfile() {

    const accessToken = tokenManager.getAccessToken();
    const response = await apiClient.get(
        '/user/profile',{
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
    )

    return response.data
}

export async function refreshToken() {

    const refreshToken = tokenManager.getRefreshToken();

    await apiClient.post(
        '/auth/refresh',
        { refreshToken }
    )
    .then(({data}) => {
        tokenManager.setAccessToken(data.accessToken);
        tokenManager.setRefreshToken(data.refreshToken);
        store.dispatch(setAuthorized(true));
    })
    .catch(() => {
        tokenManager.clearToken();
        store.dispatch(logoutAuth())
    })

    return
}

export async function logout() {

    const accessToken = tokenManager.getAccessToken();
    const response = await apiClient.post(
            '/user/logout', {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            }
        )
        
    store.dispatch(logoutAuth())
    tokenManager.clearToken()
    return response.data

}