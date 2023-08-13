import React from 'react'
import { useState } from 'react';
import { Table, Modal, Input } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import axios from 'axios';

const Tables = (props) => {
    console.log(props);
    const [isEditing, setisEditing] = useState(false);
    const [editRecords, setEditrecords] = useState(null);

    const columns = [
        {
            title: 'USER ID',
            dataIndex: 'userId',
            key: 'userId'
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'BODY',
            dataIndex: 'body',
            key: 'body'
        }
        ,
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (record) => {
                return <>
                    <EditOutlined
                        onClick={() => {
                            handleEdit(record.id);
                        }}
                        style={{ color: 'blue', marginLeft: 6, fontSize: '20px' }}

                    />
                    <DeleteFilled
                        style={{ color: 'red', marginLeft: 12, fontSize: '20px' }}
                        onClick={() => {
                            handleDelete(record.id);
                        }}
                    />
                </>
            }


        }
    ];

    const handleEdit = (id) => {
        setisEditing(true);
    }

    const handleDelete = (deleteID) => {
        // alert(deleteID)
        Modal.confirm({
            title: 'Are you want to delete this records ?',
            okType: 'danger',
            onOk: () => {
                axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteID}`)
                    .then(res => {
                        console.log("Data deleted :", res);
                        console.log(res.data);

                        const posts = props.data.filter(item => item.id !== deleteID);
                        props.setData(posts);
                        // alert("Deleted!!!")

                    })
                    .catch(err => console.log(err))
            }
        })
    };

    return (
        <>
            <div style={{
                width:'100%',
                height: '500px'
            }}>
                <Table
                    style={{
                        width: '100%',
                        margin: '20px auto',
                        backgroundColor: '#FFEECC'
                    }}
                    columns={columns}
                    dataSource={props.data}
                    scroll={{ y: 400 }}
                    pagination={{ pageSize: 50 }}
                    bordered
                ></Table>
                <Modal
                    title="Edit Records"
                    visible={isEditing}
                    onCancel={() => {
                        setisEditing(false)
                    }}
                    onOk={() => {
                        setisEditing(false)
                    }}

                >
                    <Input />
                </Modal>

            </div>

        </>
    )
}
export default Tables;
