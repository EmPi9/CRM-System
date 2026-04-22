import axios, { AxiosError } from 'axios';
import { openNotification } from './notification';


const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: 'Недопустимые/отсутствующие поля.',
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

  openNotification('Ошибка', DEFAULT_ERROR_MESSAGES[status]);
}                      

