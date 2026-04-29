import { notification } from 'antd';

export const openNotification = (title: string, description: string) => {
  notification.open({
    title: title,
    description:
      description,
  });
};