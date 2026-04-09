import { addTask } from '../api/todos'
import { Flex, Form, Button, Input } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { openNotification } from '../helper/notification'
export interface FetchDataProps {
    fetchData: () => Promise<void>;
}

export default function AddTask({ fetchData }: FetchDataProps) {
    const [form] = useForm()

    const handleSubmit = async (values: { nameTask: string }) => {
        try {
            await addTask(values.nameTask);
            form.resetFields();
        } catch(error: AxiosError) {
            if(error.response.status == 400){
                openNotification('Ошибка', 'Недопустимое отсутствующие/некорректные поля.')
            }
            if(error.response.status == 500){
                openNotification('Ошибка', 'Внутренняя ошибка сервера.')
            }
            return          
        }

        await fetchData();
    }

    return (
        <Form onFinish={handleSubmit} form={form}>
            <Flex gap="medium" justify="center">
                <Form.Item
                    validateFirst
                    name="nameTask"
                    validateTrigger="onBlur"
                    rules={[
                        { max: 64, message: 'Максимум 64 символа'},
                        { min: 2, message: 'Минимум 2 символа'},
                        { required: true, message: 'Заполните поле'},
                        { whitespace: true, message: 'Поле должно состоять из символов'}
                    ]}
                >
                    <Input variant="underlined" size='medium' placeholder="Задача" />
                </Form.Item>
                <Button type="primary" htmlType="submit">Создать</Button>
            </Flex>
        </Form>
    )
}