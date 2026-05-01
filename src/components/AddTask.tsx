import { addTask } from '../api/todos'
import { Flex, Form, Button, Input } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { handleApiError } from '../helper/handleApiError'
interface FetchData {
    fetchData: () => Promise<void>;
}

export default function AddTask({ fetchData }: FetchData) {
    const [form] = useForm()

    const handleSubmit = async (values: { todo: string }): Promise<void> => {
        try {
            await addTask(values.todo);
            form.resetFields();
            await fetchData();
        } catch(error: AxiosError) {
            handleApiError(error);          
        }
    }

    return (
        <Form onFinish={handleSubmit} form={form}>
            <Flex gap="medium" justify="center">
                <Form.Item
                    validateFirst
                    name="todo"
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