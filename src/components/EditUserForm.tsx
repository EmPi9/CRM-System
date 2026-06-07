import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserById } from "../api/admin";
import { User } from '../types/admin.models.types'
import { Form, Typography, Input, Button, Space, Flex } from "antd";
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { editUserById } from '../api/admin'
import { isRole } from '../helper/isRole'

const { Title, Text } = Typography;

export function EditUserForm() {
    const { id } = useParams();
    const [ user, setUser ] = useState<User>();
    const [ form ] = useForm()
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const isAdmin = isRole('ADMIN');

    const formInitialValues = { 
        username: user.username,
        email: user.email,
        phoneNumber: user?.phoneNumber
    };

    async function getUserInfo() {
        const userId = Number(id);
        const response = await getUserById(userId);
        setUser(response);
    }

    useEffect(() => {
        getUserInfo();
    }, [id])


    const handleSubmit = async ( values: {
        username: string,
        email: string,
        phoneNumber: string,
    }
    ) => {
        const payload = {
            username: values.username === formInitialValues.username && values.username,
            email: values.email === formInitialValues.email && values.email,
            phoneNumber: values.phoneNumber === formInitialValues.phoneNumber && values.phoneNumber,
        };

        await editUserById(user.id, payload.email, payload.phoneNumber, payload.username);
        setIsEditing(false);
        getUserInfo();
    }

    return(
        <>   
            <Title> Профиль пользователя с id: { user?.id } </Title>

            { isEditing ? (
                <Form layout="vertical" form={form} onFinish={handleSubmit}
                initialValues={formInitialValues}
            >
                <Form.Item
                  label="Имя пользователя" 
                  name="username"
                  validateTrigger="onBlur"
                  rules={[
                    { required: true, message: 'Заполните поле' },
                  ]}
                  
                  className="todo_item_input_edit"
                >
                  <Input type="text" />
                </Form.Item>
                 <Form.Item
                  name='email' 
                  label="Почтовый адрес"
                  validateTrigger="onBlur"
                  rules={[
                    { type: 'email', message: 'Не является допустимым адресом электронной почты' },
                    { required: true, message: 'Заполните поле' },
                  ]}
                  
                  className="todo_item_input_edit"
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                 name="phoneNumber"
                 label="Телефон"
                 validateTrigger="onBlur"
                 rules={[
                   { required: true, message: 'Заполните поле' },
                 ]}
                 
                 className="todo_item_input_edit"
                 >
                  <Input type="text" />
                </Form.Item>

                <Button className="profile_user_form_button" htmlType="submit">Изменить</Button>
            </Form>

            ) : (
                <Space vertical>
                    <Text>Имя пользователя: { user?.username }</Text>
                    <Text>Электронная почта: { user?.email }</Text>
                    <Text>Телефон: { user?.phoneNumber }</Text>
                    <Flex gap={12}>
                        { isAdmin && (<Button onClick={() => setIsEditing(true)} color="primary" type="primary">Редактирование</Button>) }  
                        <Button onClick={() => navigate('/users')} color="primary" type="primary">Назад к Таблице пользователей </Button>
                    </Flex>
                </Space>
            )}  
        </>

    )
}