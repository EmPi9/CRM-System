import axios from 'axios';
import { tokenManager } from '../helper/tokenManager';
import { User, MetaResponse } from '../types/admin.models.types'

const API_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_BASE + '/api/v1' 
  : '/api/v1';


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



export async function getAllUsers(
    search?: string,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    page?: number,
    pageSize?: number,
    isBlocked?: boolean | null
): Promise<MetaResponse<User>> {


    const payload = {
        search,
        sortBy,
        sortOrder,
        isBlocked,
        pageSize,
        page
    }
    
    const response = await apiClient.get(
        '/admin/users',
        { params: payload }
    )
    
    return response.data
}


export async function getUserById(id: number): Promise<User> {

    const response = await apiClient.get(
        `/admin/users/${id}`
    )

    return response.data
}

export async function editUserById(
    id: number,
    email: string,
    phoneNumber: string,
    username: string,
): Promise<User> {

    const payload = {
        email,
        phoneNumber,
        username,
    }

    const response = await apiClient.put(
        `/admin/users/${id}`,
        payload
    )

    return response.data
    
}

export async function deleteUser(id: number): Promise<string> {
    
    const response = await apiClient.delete(
        `/admin/users/${id}`,
    )

    return response.data
}

export async function blockUser(id: number): Promise<User> {

    const response = await apiClient.post(
        `/admin/users/${id}/block`,
    )

    return response.data
}

export async function unblockUser(id: number): Promise<User> {

    const response = await apiClient.post(
        `/admin/users/${id}/unblock`,
    )

    return response.data
}

export async function updateUserRights(id: number, roles: Object): Promise<User | string> {

    const response = await apiClient.post(
        `/admin/users/${id}/rights`,
        roles
    )

    return response.data

}

