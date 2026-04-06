import { useState, Dispatch, SetStateAction } from "react";
import { deleteTask, editTask } from '../api/todos'
import CheckBox from '../ui/CheckBox/CheckBox'
import Button from '../ui/Button/Button'
import { EditOutlined, PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Flex, Input, Form } from 'antd' 
import { FetchDataProp, Todo } from "../types/components.models.types"
import Typography from "antd/es/typography/Text";


export interface TodoItemProps {
     fetchData: FetchDataProp,
     item: Todo,
     setIsNeedUpadete: Dispatch<SetStateAction<boolean>>, 
}

export default function TodoItem({ fetchData, item, setIsNeedUpadete }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const handleDelete = async (taskId: number) =>  {
        try {
            await deleteTask(taskId);
        } catch(error) {
            return            
        }

        fetchData();
    }
    
    const handleStartEditing = (title: string) => {
        setIsEditing(true);
        setIsNeedUpadete(false);
        setInputValue(title);
    }

    const handleSaveEditings = async (values: { editTask: string }, taskId: number, taskDone: boolean) =>  {
        try {
            await editTask(taskId, values.editTask, taskDone);
        } catch(error) {
            return            
        }
        setIsEditing(false)
        setIsNeedUpadete(true);
    }

    const handleCompleteTask = async (taskId: number, taskTitle: string, taskDone: boolean) => {
        taskDone = !taskDone

        try {
            await editTask(taskId, taskTitle, taskDone);
        } catch(error) {
            return            
        }
        await fetchData();
    }

    const handleStopEditing = async () => {
        setIsEditing(false);
        setIsNeedUpadete(true);
    }

    return (
      <Card style={{ width: 500 }}>
        <Flex gap="medium" justify="space-between">
          <CheckBox
            checked={item.isDone}
            onChange={() => handleCompleteTask(item.id, item.title, item.isDone)}
          />      

          {isEditing === true ? (
            <Form
              initialValues={{ editTask: inputValue }}
              onFinish={(values: { editTask: string }) => handleSaveEditings(values, item.id, item.isDone)} 
              onValuesChange={(changedValues) => {
                if (changedValues.editTask) {
                  setInputValue(changedValues.editTask);
                }
              }}
              style={{ flex: 1 }}
            >
              <Flex gap="small" align="flex-end" justify="space-between" style={{ width: '100%' }}>
                <Form.Item
                  name="editTask"
                  validateTrigger="onBlur"
                  rules={[
                    { max: 64, message: 'Максимум 64 символа' },
                    { min: 2, message: 'Минимум 2 символа' },
                    { required: true, message: 'Заполните поле' },
                    { whitespace: true, message: 'Поле должно состоять из символов' }
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
                  onClick={() => handleStopEditing()} 
                  icon={<CloseOutlined />} 
                />
              </Flex>
            </Form>
          ) : (
            <Typography disabled={item.isDone} delete={item.isDone}>
              {item.title}
            </Typography>
          )}      

          {isEditing === false && (
            <Flex gap="small">
              <Button onClick={() => handleStartEditing(item.title)} icon={<EditOutlined />} />
              <Button danger onClick={() => handleDelete(item.id)} icon={<DeleteOutlined />} />
            </Flex>
          )}
        </Flex>
      </Card>
    );
}