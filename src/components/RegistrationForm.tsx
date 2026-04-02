import { Form, Input } from "antd";
import Button from "../ui/Button/Button";
import { PhoneInput } from '../components/PhoneInput'



export default function RegistrationForm(){


    return (
        <Form style={{ width: 500 }} layout="vertical">
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
                name="phone"
                label="Телефон"
                 rules={[
                      {
                        pattern: new RegExp(/^[0-9]{10}$/),
                        message: 'Phone number must be exactly 10 digits!',
                      }]}
              >
                <PhoneInput />
              </Form.Item>

            <Button>Зарегистрироваться</Button>
        </Form>
    )
}