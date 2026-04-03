import { addTask } from '../api/todos'
import { Flex, Form } from 'antd'
import { useForm } from 'antd/es/form/Form';
import Button from "../ui/Button/Button"
import Input from "../ui/Input/Input"

export interface FetchDataProps {
    fetchData: () => Promise<void>;
}

export default function AddTask({ fetchData }: FetchDataProps) {
    const [form] = useForm()

    const handleSubmit = async (values: { nameTask: string }) => {
        try {
            await addTask(values.nameTask);
            await fetchData();
            form.resetFields();
        } catch(error) {             
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
                <Button htmlType="submit">Создать</Button>
            </Flex>
        </Form>
    )
}