import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./axxxx.css";
import { CustomTable } from '../../Components/Tables.js/CustomTable/CustomTable';
import Tables from '../../Components/Tables.js/Tables';

export const AxiosPostRequest = () => {
    const [formData, setFormData] = useState({
        userId: "",
        id: "",
        title: "",
        body: ""
    });

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const { userId, id, title, body } = formData;



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId && id && title && body) {
            axios.post('https://jsonplaceholder.typicode.com/posts', formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ userId: "", id: "", title: "", body: "" });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    const handleDelete = (deleteID) => {
        // alert(deleteID)
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteID}`)
            .then(res => {
                console.log("Data deleted :", res);
                console.log(res.data);

                const posts = data.filter(item => item.id !== deleteID);
                setData(posts);
                alert("Deleted!!!")

            })
            .catch(err => console.log(err))
    };

    const handleUpdate = (editID) => {
        // alert(editID)
        if (userId && id && title && body) {
            axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, formData)
                .then(res => {
                    setFormData({ userId: "", id: "", title: "", body: "" });
                    setData([res.data])
                    alert("Updated!!!")
                    // setRefresh(refresh + 1)
                })
                .catch(err => console.log(err))

        }
    };
    const handleEdit = (editIDNotState) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${editIDNotState}`)
            .then(res => {
                setFormData(res.data)

            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                const list = res.data || [];
                const firstObject = list[0] || {};
                const cols = [];
                for (const key in firstObject) {
                    const col = {
                        title: key,
                        dataIndex: key
                    }

                    cols.push(col)

                }
                const operation = {
                    title: "Actions",
                    dataIndex: "operation"
                }
                cols.push(operation);
                setColumns(cols)
                setData(list)

            })
            .catch(err => console.log(err))
        // console.log(data);
    }, []);

    return (
        <>
            {/* <div className='form-data'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name='userId'
                        id='userId'
                        placeholder='Enter userId'
                        value={userId}
                        onChange={handleChange}

                    />
                    <input
                        type="text"
                        name='id'
                        id='id'
                        placeholder='Enter Id'
                        value={id}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name='title'
                        id='title'
                        placeholder='Enter title'
                        value={title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name='body'
                        id='body'
                        placeholder='Enter body'
                        value={body}
                        onChange={handleChange}
                    />
                    <button>Submit</button>
                    <button type="submit" className="btn btn-primary" onClick={() => {
                        handleUpdate(id)
                    }}>
                        Update
                    </button>
                </form>
            </div> */}
            <div className="data-show">
                <CustomTable data={data} setData={setData} columns={columns} />
                {/* <Tables data={data} setData={setData} /> */}
            </div>
        </>
    )
}
