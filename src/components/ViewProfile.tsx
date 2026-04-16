import { useEffect, useState } from 'react';
import getUserProfile from '../api/users'
import { Typography, Space } from 'antd';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

type Role = ADMIN | USER | MODERATOR;

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
            } catch (err: AxiosError) {
                if(err.response.status == 401) {
                    navigate('/authorization')
                }
            }
        }

        fetchProfile();
    }, [])


    return ( <>
    <Space vertical>
        <Title> Профиль </Title>
        <Text>ID: { profileData?.id }</Text>
        <Text>Имя пользователя: { profileData?.username }</Text>
        <Text>Электронная почта: { profileData?.email }</Text>

        { profileData?.phoneNumber ? <Text>Номер телефона: { profileData?.phoneNumber }</Text> : '' } 
    </Space>
    </>
    )
}