import axios, { AxiosError } from 'axios';
import { openNotification } from './notification';
import { tokenManager } from '../helper/tokenManager';
import { store } from '../store';
import { logoutAuth } from '../store/authSlice'

const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: 'Недопустимые/отсутствующие поля.',
  401: 'Время авторизации прошло',
  404: 'Задача не найдена.',
  500: 'Внутренняя ошибка сервера.',
};

export function handleApiError(
  error: AxiosError
) {
  if (!axios.isAxiosError(error)) {
    openNotification('Ошибка', 'Произошла неизвестная ошибка.');
    return
  }

  const status = error.response?.status;

  if (!status) {
    openNotification('Ошибка', 'Нет подключения к интернету или сервер не отвечает.');
    return
  }

  if (status == 401) {
    
    const logout = async () => {
      store.dispatch(logoutAuth())
      tokenManager.clearToken()
      window.location.replace('/authorization');
    }

    logout();
  }

  openNotification('Ошибка', DEFAULT_ERROR_MESSAGES[status]);
}                      

