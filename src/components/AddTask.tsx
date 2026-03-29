import { useState } from "react" 
import { addTask } from '../api/todos'
import { Flex, Form } from 'antd'
import { useForm } from 'antd/es/form/Form';
import Button from "../ui/Button/Button"
import Input from "../ui/Input/Input"

export interface FetchDataProps {
    fetchData: () => Promise<void>;
}

export default function AddTask({ fetchData }: FetchDataProps) {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [form] = useForm()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            try {
                await addTask(taskTitle);
                await fetchData();
                form.resetFields();
            } catch(error) {             
                alert('Ошибка работы сервера.')
                return          
            }

            await fetchData();
            setTaskTitle('');
        } catch {

        }
    }

    return (
        <Form onFinish={handleSubmit} form={form}>
            <Flex gap="medium" justify="center">
                <Form.Item
                    validateFirst
                    name="field_b"
                    validateTrigger="onBlur"
                    rules={[
                        { max: 64, message: 'Максимум 64 символа'},
                        { min: 2, message: 'Минимум 2 символа'},
                        { required: true, message: 'Заполните поле'},
                        { whitespace: true, message: 'Поле должно состоять из символов'}
                    ]}
                >
                    <Input onChange={handleInputChange} variant="underlined" size='medium' placeholder="Задача" />
                </Form.Item>
                <Button htmlType="submit">Создать</Button>
            </Flex>
        </Form>
    )
}