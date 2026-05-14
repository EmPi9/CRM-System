import { useEffect, useState } from 'react';
import { getUserProfile, logout } from '../api/users'
import { Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Button } from 'antd'
import { handleApiError } from '../helper/handleApiError'
import { tokenManager } from '../helper/tokenManager';
import { store } from '../store';
import { logoutAuth } from '../store/authSlice'
import { Role } from '../types/users.models.types'

interface Profile { 
  id: number; 
  username: string; 
  email: string; 
  date: string; 
  isBlocked: boolean; 
  roles: Role[]; 
  phoneNumber?: string; 
}

const { Text, Title } = Typography;

export default function ViewProfile() {
    const [profileData, setProfileData] = useState<Profile>();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getUserProfile();
                setProfileData(data);
            } catch(err: AxiosError) {
                store.dispatch(logoutAuth())
                tokenManager.clearToken()
                await navigate('/authorization');
                handleApiError(err);  
            }

        }

        fetchProfile();
    }, [])

    const handleLogout = async () => {
        try {
            await logout();
            await navigate('/authorization');
            store.dispatch(logoutAuth())
            tokenManager.clearToken()
        } catch(err: AxiosError) {
            handleApiError(err);  
        }
    }


    return ( <>
    <Space vertical>
        <Title> Профиль </Title>
        <Text>ID: { profileData?.id }</Text>
        <Text>Имя пользователя: { profileData?.username }</Text>
        <Text>Электронная почта: { profileData?.email }</Text>

        { profileData?.phoneNumber ? <Text>Номер телефона: { profileData?.phoneNumber }</Text> : '' } 

        <Button onClick={() => handleLogout()} type='primary'>Выйти из аккаунта</Button>
    </Space>
    </>
    )
}