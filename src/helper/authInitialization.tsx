
import { useEffect } from 'react';
import { tokenManager } from './tokenManager';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../api/users' 

const navigate = useNavigate();

export default function AuthInitialization(){
    useEffect(() => {
        const checkAuth = async () => {
            const token = tokenManager.getRefreshToken();

            if(!token) {
              navigate('/authorization')
              return
            }

            const newToken = async () => {
                await refreshToken();
            }

            newToken();
        }

    checkAuth();
    }, [])

    return
  }