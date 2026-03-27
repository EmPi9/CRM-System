import { useState } from "react";
import { deleteTask, editTask } from '../api/todos'
import CheckBox from '../ui/CheckBox/CheckBox'
import Button from '../ui/Button/Button'
import { EditOutlined, PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Flex, Input, Form } from 'antd' 
import { FetchDataProp, Todo } from "../../src/types/components.types"
import Typography from "antd/es/typography/Text";


export interface TodoItemProps {
     fetchData: FetchDataProp,
     item: Todo
}

export default function TodoItem({ fetchData, item }: TodoItemProps) {
    const [editing, setEditing] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const handleDelete = async (taskId: number) =>  {
        try {
            await deleteTask(taskId);
        } catch(error) {
            alert('Ошибка работы сервера.')
            return            
        }

        fetchData();
    }
    
    const handleStartEditing = (title: string) => {
        setEditing(true);
        setInputValue(title);
    }

    const handleSaveEditings = async (taskId: number, taskDone: boolean) =>  {
        try {
            await editTask(taskId, inputValue, taskDone);
        } catch(error) {
            alert('Ошибка работы сервера.')
            return            
        }
        await fetchData();
        setEditing(false)
    }

    const handleCompleteTask = async (taskId: number, taskTitle: string, taskDone: boolean) => {
        taskDone = !taskDone

        try {
            await editTask(taskId, taskTitle, taskDone);
        } catch(error) {
            alert('Ошибка работы сервера.')
            return            
        }
        await fetchData();
    }

    return (
       <Card style={{ width: 500 }}>
  <Flex gap="medium" justify="space-between">
    <CheckBox
      checked={item.isDone}
      onChange={() => handleCompleteTask(item.id, item.title, item.isDone)}
    />

    {editing === true ? (
      <Form
        initialValues={{ field_b: inputValue }}
        onFinish={() => handleSaveEditings(item.id, item.isDone)} 
        onValuesChange={(changedValues) => {
          if (changedValues.field_b) {
            setInputValue(changedValues.field_b);
          }
        }}
        style={{ flex: 1 }}
      >
        <Flex gap="small" align="flex-end" justify="space-between" style={{ width: '100%' }}>
          <Form.Item
            name="field_b"
            validateTrigger="onBlur"
            rules={[
              { max: 64, message: 'Максимум 64 символа' },
              { min: 3, message: 'Минимум 3 символа' },
              { required: true, message: 'Заполните поле' }
            ]}
            style={{ marginBottom: 0, flex: 1 }}
          >
            <Input type="text" />
          </Form.Item>
          <Button 
            htmlType="submit" 
            icon={<PlusOutlined />} 
          />
          <Button 
            htmlType="button" 
            onClick={() => setEditing(false)} 
            icon={<CloseOutlined />} 
          />
        </Flex>
      </Form>
    ) : (
      <Typography disabled={item.isDone} delete={item.isDone}>
        {item.title}
      </Typography>
    )}

    {editing === false && (
      <Flex gap="small">
        <Button onClick={() => handleStartEditing(item.title)} icon={<EditOutlined />} />
        <Button danger onClick={() => handleDelete(item.id)} icon={<DeleteOutlined />} />
      </Flex>
    )}
  </Flex>
</Card>
    );
}