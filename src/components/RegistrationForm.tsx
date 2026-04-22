import { Form, Input, Typography, Flex, Button } from "antd";
import { registrationUser } from '../api/users'
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { openNotification } from '../helper/notification'
import { handleApiError } from '../helper/handleApiError'

export default function RegistrationForm(){
    const navigate = useNavigate();
    const [form] = useForm()
    const { Title } = Typography;
    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    

    const handleSubmit = async (values: { 
        login: string, 
        username: string, 
        password: string, 
        email: string,
        phoneNumber?: string  
    }) => {
      try {
        await registrationUser(values.login, values.username, values.password, values.email, values.phoneNumber);
        setIsFormFilled(true)
        openNotification('Успешно', 'Регистрация прошла успешно. Для авторизации, перейдите на страницу авторизации для входа в систему')
        form.resetFields();
      } catch(error: AxiosError) {
        handleApiError(error);
        return          
      }
    }  

    return (
        isFormFilled ? 
        <>
          <Title level={3}>Для продолжения перейдите на страницу авторизации</Title>
          <Flex gap={12}>
              <Button type="primary" onClick={() => navigate('/authorization')}>Авторизация</Button>
              <Button type="default" onClick={() => setIsFormFilled(false)}>Заполнить регистрацию еще раз</Button>
          </Flex>
        </>
        :
        <Form className="registration_form" layout="vertical" onFinish={handleSubmit} form={form}>
            <Title level={2}>Регистрация</Title>
            <Form.Item label="Имя пользователя" name="username" rules={[
                { required: true, message: 'Заполните пожалуйста поле' },
                { max: 60, message: 'Максимум 60 символа' },
                { min: 1, message: 'Минимум 1 символа' },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item label="Логин" name="login" rules={[
                { required: true, message: 'Заполните пожалуйста поле' },
                { max: 60, message: 'Максимум 60 символа' },
                { min: 2, message: 'Минимум 2 символа' },
                { pattern: /^[a-zA-Z]+$/, message: 'Разрешены только латинские буквы'},
                ]}>
                <Input />
            </Form.Item>

            <Form.Item label="Пароль" name="password" rules={[
                { required: true, message: 'Заполните пожалуйста поле'},
                { max: 60, message: 'Максимум 60 символа' },
                { min: 6, message: 'Минимум 6 символа' },

                ]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Повторите пароль"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, подтвердите свой пароль',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Введенный вами новый пароль не совпадает'));
                    },
                  }),
                ]}
              >
                <Input.Password />
            </Form.Item>

            <Form.Item name='email' label="Почтовый адрес" rules={[
                { type: 'email', message: 'Не является допустимым адресом электронной почты' },
                { required: true, message: 'Заполните пожалуйста поле'},
                ]}>
              <Input />
            </Form.Item>

            <Form.Item
                name="phoneNumber"
                label="Телефон"
                 rules={[
                      {
                        pattern: new RegExp(/^[0-9]{11}$/),
                        message: 'Номер телефона должен состоять ровно из 11 цифр',
                      },
                      { pattern: /^8/,
                        message: 'Значение должно начинаться с 8' 
                      },
                    ]}
              >
                <Input />
              </Form.Item>

            <Button htmlType="submit">Зарегистрироваться</Button>
        </Form>
    )
}