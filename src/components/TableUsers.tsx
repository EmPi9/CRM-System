import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import { getAllUsers, deleteUser, unblockUser, blockUser, updateUserRights } from '../api/admin'
import { AxiosError } from 'axios';
import { handleApiError } from '../helper/handleApiError'
import { MetaResponse, User } from '../types/admin.models.types'
import { Card, Space, Table, Typography, Button, Flex, Modal, Input, Select } from 'antd';
import type { TableColumnsType, TablePaginationConfig } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { selectIsAdmin, } from '../store/authSelectors';
import { useSelector } from "react-redux"
import type { SelectProps } from 'antd';

interface DataType {
    key: React.Key,
    username: string,
    email: string,
    phone: string,
    roles: string,
    isBlocked: string,
    dateRegister: string,
}

export function TableUsers() {
    const [ usersData, setUsersData ] = useState<MetaResponse<User>>();
    const [ search, setSearch ] = useState<string>('');
    const [ sortBy, setSortBy ] = useState<string>('id');
    const [ sortOrder, setSortOrder ] = useState<"asc" | "desc" | undefined>("asc");
    const [ blocked, setBlocked ] = useState<string | undefined>('allUsers');
    const [ isBlocked, setIsBlocked ] = useState<boolean | null>(null);
    const [ pagination, setPagination ] = useState({
        current: 1,
        pageSize: 20,
    });

    const { Title } = Typography;
    const navigate = useNavigate();
    const isAdmin = useSelector(selectIsAdmin);
    const options: SelectProps['options'] = [
      { value: 'ADMIN' },
      { value: 'MODERATOR' },
      { value: 'USER' },
      { value: 'HUILA' },
    ];

    const fetchUsers = useCallback(async (page: number, pageSize: number, filterValue: boolean | null) => {
        try {
            const response = await getAllUsers(search, sortBy, sortOrder, page - 1, pageSize, filterValue);

            setUsersData(response);
            setPagination(prev => ({
              ...prev,
              current: page,
              pageSize,
            }))
            
        } catch(error) {
            handleApiError(error as AxiosError);
        }
        
    }, [search, sortBy, sortOrder])

    useEffect(() => {     
        fetchUsers(1, pagination.pageSize, isBlocked);
    }, [search, sortBy, sortOrder, fetchUsers, deleteUser])

    const handleTableChange = (
      newPag: TablePaginationConfig,
      filters: any,
      sorter: any
    ) => {
        const nextFilter = filters.isBlocked?.[0] || 'allUsers';
        setBlocked(nextFilter);

        const isBlocked = nextFilter === 'blockUsers' ? true 
            : nextFilter === 'activeUsers' ? false 
            : null;
        
        setIsBlocked(isBlocked);

        if (sorter && !Array.isArray(sorter) && sorter.field) {
          setSortBy(sorter.field as string);
          setSortOrder(sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : 'asc');
          return;
        }

        const page = newPag.current ?? 1;
        const size = newPag.pageSize ?? pagination.pageSize;
        
        fetchUsers(page, size, isBlocked);
    };
    

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const columns: TableColumnsType<DataType> = [
        {
          title: 'Имя',
          dataIndex: 'username',
          sorter: true,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          sorter: true,
        },
        {
          title: 'Телефон',
          dataIndex: 'phone',
        },
        {
          title: 'Роли',
          dataIndex: 'roles',
          render: (roles: string[]) => (
            <Space>
                {roles.map((role) => {
                    let color

                    if(role === 'USER'){
                        color="purple"
                    } else if (role === 'MODERATOR'){
                        color="cyan"
                    } else if (role === 'ADMIN'){
                        color="primary"
                    } else {
                        color="default"
                    }

                    return (
                        <Button color={color} variant="filled">{role}</Button>
                    )
                })}
            </Space>
          )
        },
        {
            title: 'Блокировка',
            dataIndex: 'isBlocked',
            filterMultiple: false,
            filters: [
              {
                text: 'Все пользователи',
                value: 'allUsers',
              },
              {
                text: 'Только заблокированные пользователи',
                value: 'blockUsers',
              },
               {
                text: 'Только активные пользователи',
                value: 'activeUsers',
              },
            ],
            filteredValue: blocked ? [blocked] : undefined,
        },
        {
            title: 'Дата регистр',
            dataIndex: 'dateRegister',
        },
        {
            title: 'Действия',
            render: (_, record) => (
                <Flex gap={12}>
                    <Button onClick={() => navigate(`/users/edit/${record.key}`)} type='primary'>
                        <ArrowRightOutlined />
                    </Button>

                    { record.isBlocked == '+' ?
                        <Button onClick={() => {
                            Modal.confirm({
                                title: 'Подтверждение разблокировки пользователя',
                                content: `Вы подтверждатете разблокировку пользователя с ID ${record.key}?`,
                                okText: 'Разблокировать',
                                cancelText: 'Отмена',
                                onOk: async () => {
                                    const userId = Number(record.key)
                                    await unblockUser(userId);
                                    await fetchUsers(1, pagination.pageSize, isBlocked);
                                }
                            });
                          }} type='primary'>Разблок</Button>
                        : 
                        <Button onClick={() => {
                           Modal.confirm({
                               title: 'Подтверждение разблокировки пользователя',
                               content: `Вы подтверждатете блокировку пользователя с ID ${record.key}?`,
                               okText: 'Заблокировать',
                               cancelText: 'Отмена',
                               onOk: async () => {
                                   const userId = Number(record.key)
                                   await blockUser(userId);
                                   await fetchUsers(1, pagination.pageSize, isBlocked);
                               }
                           });
                         }} type='primary'>Блок</Button> }
                    
                    { isAdmin ? (
                        <>
                            {
                            }
                            <Button
                              type="primary"
                              onClick={() => {
                                let selectedValues = Array.isArray(record.roles)
                                    ? record.roles
                                    : record.roles ? [record.roles] : [];

                                Modal.confirm({
                                    title: 'Изменение роли пользователя',
                                    content: (
                                        <>
                                            Изменить роль пользователя на 
                                            { <Select
                                              mode="multiple"
                                              allowClear
                                              className='table_user_select'
                                              placeholder={'Выберите роли которые будут использоватсься'}
                                              defaultValue={selectedValues}
                                              onChange={(values: string[]) => {
                                                selectedValues = values;
                                              }}
                                              options={options}
                                            /> }
                                        </>),
                                    okText: 'Изменить',
                                    cancelText: 'Отмена',
                                    onOk: async () => {
                                        const userId = Number(record.key)
                                        const body = { roles: selectedValues }; 

                                        await updateUserRights(userId, body);
                                        await fetchUsers(1, pagination.pageSize, isBlocked);
                                    }
                                });
                              }}
                            >
                                <FormOutlined />
                            </Button>

                            <Button
                              type="primary"
                              onClick={() => {
                                Modal.confirm({
                                    title: 'Подтверждение удаления пользователя',
                                    content: `Вы подтверждатете удаление пользователя с ID ${record.key}?`,
                                    okText: 'Удалить',
                                    cancelText: 'Отмена',
                                    onOk: async () => {
                                        const userId = Number(record.key)
                                        await deleteUser(userId);
                                        await fetchUsers(1, pagination.pageSize, isBlocked);
                                    }
                                });
                              }}
                            >
                              <DeleteOutlined />
                            </Button>
                        </>) : 
                        (
                            ''
                        ) }

                </Flex>
                
            ),
        }
    ];

    const data = usersData?.data?.map((user: any): DataType  => ({
        key: user.id.toString(),
        username: user.username,
        email: user.email,
        phone: user.phoneNumber ? user.phoneNumber : 'Номера нет',
        roles: Array.isArray(user.roles) ? user.roles : [],
        isBlocked: user.isBlocked ? '+' : '-',
        dateRegister:  user.date.split('T')[0],
    }))

    return (
    <>
        <Card>
            <Flex justify='space-between'>
                <Title level={4} className='profile_user_title'>Пользователи</Title>
                <Input size='medium' className='profile_user_search_input' onChange={handleSearch} placeholder="Поиск" />
            </Flex>
            

            <Table<DataType>
                columns={columns}
                dataSource={data}
                onChange={handleTableChange}
                rowKey="key"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: usersData?.meta.totalAmount,
                    showSizeChanger: false
                }}
                
            />
        </Card>

    </>
    )

}