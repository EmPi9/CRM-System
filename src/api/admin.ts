import { User, MetaResponse, UserFilters } from '../types/admin.models.types'
import { apiClient } from '../api/client'

export async function getAllUsers(filters: UserFilters = {}): Promise<MetaResponse<User>> {

    const response = await apiClient.get(
        '/admin/users',
        { params: filters }
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
): Promise<User | string> {

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

export async function blockUser(id: number): Promise<User | string> {

    const response = await apiClient.post(
        `/admin/users/${id}/block`,
    )

    return response.data
}

export async function unblockUser(id: number): Promise<User | string> {

    const response = await apiClient.post(
        `/admin/users/${id}/unblock`,
    )

    return response.data
}

export async function updateUserRights(id: number, roles: string[]): Promise<User | string> {

    const response = await apiClient.post(
        `/admin/users/${id}/rights`,
        roles
    )

    return response.data

}

