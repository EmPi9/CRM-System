import { Flex, Card, Form, Button, Input, Typography } from 'antd'
import AuthPhoto from '../assets/illustration.jpg'
import AuthLogo from '../assets/logo.jpg'
import { authorizationUser } from '../api/users';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { openNotification } from '../helper/notification'
import { useNavigate } from 'react-router';

const { Title } = Typography;
 
export default function AuthorizationForm() {
    const [form] = useForm()
    const navigate = useNavigate();

    const handleSubmit = async (values: { login: string, password: string }) => {
        try {
            await authorizationUser(values.login, values.password)
        } catch(error: AxiosError) {
            if(error.response.status == 400){
                openNotification('Ошибка', 'Недопустимое отсутствующие/некорректные поля')
            }
            if(error.response.status == 401){
                openNotification('Неверные учетные данные', 'Неверные логин или пароль')
            }
            if(error.response.status == 500){
                openNotification('Ошибка', 'Внутренняя ошибка сервера')
            }
            return 
        }
        form.resetFields();
        navigate('/');
        
    }

    return(
        <Card>
            <Flex gap={140}>
                <img src={AuthPhoto} alt="AuthPhoto" width={800} height={800} />
                <Flex vertical justify='center' style={{marginRight: '190px'}}>
                    <img src={AuthLogo} width={72} height={72} alt="AuthLogo" />
                    <Form layout="vertical" onFinish={handleSubmit} form={form}>
                        <Title level={2}>Войдите в свой аккаунт</Title>
                        <Typography>Узнайте, что происходит с вашим бизнесом.</Typography>
                        <Form.Item label="Логин" name="login"
                        rules={[
                            { required: true, message: 'Заполните поле'},
                        ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Пароль" name="password"
                        rules={[
                            { required: true, message: 'Заполните поле'},
                        ]}>
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Авторизоваться</Button>
                    </Form>
                </Flex>
            </Flex>
        </Card>
    )
}