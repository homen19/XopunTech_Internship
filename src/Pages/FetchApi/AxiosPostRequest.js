import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ArrowDownOutlined, ArrowUpOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import "./axxxx.css";
import { CustomTable } from '../../Components/Tables.js/CustomTable/CustomTable';
// import Tables from '../../Components/Tables.js/Tables';
import { Modal } from '../../Components/Tables.js/CustomTable/Components/Modal'
import { Filter } from '../../Components/Tables.js/CustomTable/Components/Filter';
import { SearchBar } from '../../Components/Tables.js/CustomTable/Components/SearchBar';


export const AxiosPostRequest = () => {
    const [formData, setFormData] = useState({
        userId: "",
        id: "",
        title: "",
        body: ""
    });

    const [data, setData] = useState([]);
    // const { userId, id, title, body } = formData;
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState(false);
    const [filterData, setFilterData] = useState(data);
    const [search, setSearch] = useState(false);

    const handleFilterChange = (newFilterData) => {
        setFilterData(newFilterData);
        // setFilter(false)
    }

    const openModal = () => {
        setModal(true);
    }
    const openFilter = () => {
        setFilter(true);
    }
    const openSearch = () =>{
        setSearch(true)
    }

    const sortDesc = (field) => {
        const clonedData = [...data]
        const sortedOrder = clonedData.sort((a, b) => (
            b[field] - a[field]
        ));
        console.log(sortedOrder);
        setFilterData(sortedOrder);

    };
    const sortAsc = (field) => {
        const clonedData = [...data]
        const sortedOrder = clonedData.sort((a, b) => (
            a[field] - b[field]
        ));
        console.log(sortedOrder);
        setFilterData(sortedOrder);

    };
    


    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            icon: <>
                <ArrowDownOutlined title='Descending' onClick={() => sortDesc('userId')} />
                <ArrowUpOutlined title='Ascending' onClick={() => sortAsc('userId')} />
                <FilterOutlined onClick={openFilter} title='Filter' />
            </>
        },
        {
            title: "USER_ID",
            dataIndex: 'userId',
            icon: <>
                <SearchOutlined title="search" onClick={openSearch} style={{ marginLeft: 3 }} />
                <br />


            </>
        },
        {
            title: "TITLE",
            dataIndex: "title"
        },
        {
            title: "BODY",
            dataIndex: "body"
        },
        {
            title: "ACTIONS",
            dataIndex: "actions",
            render: (item) => {
                return (
                    <>
                        <button className='btn-edit' onClick={() => handleEdit(item.id)}>Edit</button>
                        <button className='btn-delete' onClick={() => handleDelete(item.id)}>Delete</button>
                    </>
                )
            }
        },

    ]
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

    // const handleUpdate = (editID) => {
    //     // alert(editID)
    //     if (userId && id && title && body) {
    //         axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, formData)
    //             .then(res => {
    //                 setFormData({ userId: "", id: "", title: "", body: "" });
    //                 setData([res.data])
    //                 alert("Updated!!!")
    //                 // setRefresh(refresh + 1)
    //             })
    //             .catch(err => console.log(err))

    //     }
    // };
    const handleEdit = (editIDNotState) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${editIDNotState}`)
            .then(res => {
                setFormData(res.data)
                openModal(editIDNotState);

            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {

                setData(res.data)
                setFilterData(res.data);

            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>

            <div className="data-show">
                <CustomTable data={filterData} setData={setData} columns={columns} />
                {/* <Tables data={data} setData={setData} /> */}
            </div>
            {modal && (
                <Modal
                    setModal={setModal}
                    formData={formData}
                    setFormData={setFormData}
                    data={data}
                    setData={setData}

                />
            )}
            {
                filter && (
                    <Filter data={data} setFilteredData={handleFilterChange} setFilter={setFilter} />
                )
            }
            {
                search && (
                    <SearchBar data={data} setFilterData={handleFilterChange} setSearch={setSearch} />
                )
            }

        </>
    )
}
