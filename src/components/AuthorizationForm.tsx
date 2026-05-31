import { Flex, Card, Form, Button, Input, Typography } from 'antd'
import AuthPhoto from '../assets/illustration.jpg'
import AuthLogo from '../assets/logo.jpg'
import { authorizeUser, getUserProfile } from '../api/users';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { handleApiError } from '../helper/handleApiError'
import { useNavigate } from 'react-router';
import { tokenManager } from '../helper/tokenManager';
import { store } from '../store';
import { setAuthorized, setIsAdmin, setIsModrator } from '../store/authSlice'

const { Title, Text, Link } = Typography;
 
export default function AuthorizationForm() {
    const [form] = useForm()
    const navigate = useNavigate();

    const handleSubmit = async (values: { login: string, password: string }) => {
        try {
            const response = await authorizeUser(values.login, values.password);
            tokenManager.setAccessToken(response.accessToken);
            tokenManager.setRefreshToken(response.refreshToken);
            store.dispatch(setAuthorized(true));
            const userRole = await getUserProfile();

            userRole.roles.forEach((role: string) => {
                if (role === 'ADMIN'){
                    store.dispatch(setIsAdmin(true));
                } 
                if (role === 'MODERATOR') {
                    store.dispatch(setIsModrator(true));
                }
            })
           
            form.resetFields();
            await navigate('/');
        } catch(error: AxiosError) {
            handleApiError(error); 
        }
        
    }

    return(
        <Card>
            <Flex gap={140}>
                <img src={AuthPhoto} alt="AuthPhoto" width={800} height={800} />
                <Flex vertical justify='center' className='authorization_block'>
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
                    <Flex gap={10} justify='center' className='link_registration '>
                        <Text>Ещё не зарегистрированы?</Text><Link onClick={() => navigate('/registration')}>Создать аккаунт</Link>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}