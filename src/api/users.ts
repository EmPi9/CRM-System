import axios from 'axios';
import { AxiosError } from 'axios';

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

function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


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

    document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=2592000;`;
    document.cookie = `accessToken=${response.data.accessToken}; path=/;  max-age=2592000;`;

    return response.data

}

export default async function getUserProfile() {
    try {
        const accessToken = getCookie('accessToken');
        const response = await apiClient.get(
            '/user/profile',{
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            }
        )

        return response.data

    } catch(e: AxiosError) {
        await refreshToken();

        const accessToken = getCookie('accessToken');
        const retryResponse = await apiClient.get(
            '/user/profile',{
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            }
        )

        return retryResponse.data
       
    }
}

export async function refreshToken() {
    try {
        const refreshToken = getCookie('refreshToken')

        const response = await apiClient.post(
            '/auth/refresh',
            { refreshToken }
        )
        

        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=2592000;`;
        document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=2592000;` ;

        return response.data.accessToken 
    } catch(error) {
        throw error;
    }
}

export async function logout() {

    try {
        const accessToken = getCookie('accessToken');
        console.log(accessToken);
        const response = await apiClient.post(
                '/user/logout',{
                  headers: {
                    'Authorization': `Bearer ${accessToken}`
                  }
                }
            )
        
        return response.data
    } catch(e: AxiosError) {
        await refreshToken();

        const accessToken = getCookie('accessToken');
        const retryResponse = await apiClient.post(
            '/user/logout',
            {},
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            }
        )

        
        return retryResponse.data
       
    }

    
}