import { tokenManager } from '../helper/tokenManager';
import { UserRegistration } from '../types/users.models.types'
import { apiClient } from '../api/client'
interface UserAuthorization { 
  login: string; 
  password: string;
}

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

export async function getUserProfile() {

    const response = await apiClient.get(
        '/user/profile',
    )

    console.log();

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