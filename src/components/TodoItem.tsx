import { useState, Dispatch, SetStateAction } from "react";
import { deleteTask, editTask } from '../api/todos'
import { Checkbox } from 'antd';
import { EditOutlined, PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Flex, Input, Form, Button } from 'antd' 
import { FetchDataProp, Todo } from "../types/todos.models.types"
import Typography from "antd/es/typography/Text";
import { handleApiError } from '../helper/handleApiError'
import { AxiosError } from 'axios';


interface Props {
     fetchData: FetchDataProp,
     item: Todo,
     setIsNeedUpdate: Dispatch<SetStateAction<boolean>>, 
}

export default function TodoItem({ fetchData, item, setIsNeedUpdate }: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const handleDelete = async (taskId: number): Promise<void> =>  {
        try {
            await deleteTask(taskId);
            await fetchData();
        } catch(error: AxiosError) {
            handleApiError(error);
            return            
        }
    }
    
    const handleStartEditing = (title: string) => {
        setIsEditing(true);
        setIsNeedUpdate(false);
        setInputValue(title);
    }

    const handleSaveEditings = async (values: { editTask: string }, taskId: number, taskDone: boolean): Promise<void> =>  {
        try {
            await editTask(taskId, values.editTask, taskDone);
        } catch(error: AxiosError) {
            handleApiError(error)
            return            
        }
        setIsEditing(false)
        setIsNeedUpdate(true);
    }

    const handleCompleteTask = async (taskId: number, taskTitle: string, taskDone: boolean): Promise<void> => {
        taskDone = !taskDone

        try {
            await editTask(taskId, taskTitle, taskDone);
            await fetchData();
        } catch(error: AxiosError) {
            handleApiError(error)
            return            
        }
        
    }

    const handleStopEditing = async (): Promise<void> => {
        setIsEditing(false);
        setIsNeedUpdate(true);
    }

    return (
      <Card className="todo_item_card">
        <Flex gap="medium" justify="space-between">
          <Checkbox
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
              className="todo_item_form"
            >
              <Flex gap="small" align="flex-end" justify="space-between" className="todo_item_inputs">
                <Form.Item
                  name="editTask"
                  validateTrigger="onBlur"
                  rules={[
                    { max: 64, message: 'Максимум 64 символа' },
                    { min: 2, message: 'Минимум 2 символа' },
                    { required: true, message: 'Заполните поле' },
                    { whitespace: true, message: 'Поле должно состоять из символов' }
                  ]}
                  
                  className="todo_item_input_edit"
                >
                  <Input type="text" />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit" 
                  icon={<PlusOutlined />} 
                />
                <Button
                  type="primary"
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
              <Button type="primary" onClick={() => handleStartEditing(item.title)} icon={<EditOutlined />} />
              <Button type="primary" danger onClick={() => handleDelete(item.id)} icon={<DeleteOutlined />} />
            </Flex>
          )}
        </Flex>
      </Card>
    );
}