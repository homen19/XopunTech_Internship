import React from 'react'
import "./Modal.css";
import axios from 'axios';

export const Modal = (props) => {

    const handleUpdate = (editID) => {
        // alert(editID)
        if (props.formDatauserId && props.formData.id && props.formData.title && props.formData.body) {
            axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, props.formData)
                .then(res => {
                    props.setFormData({userId: "", id: "", title: "", body: "" });
                    props.setData([res.data])
                    // alert("Updated!!!")
                    console.log("updated");
                    // setRefresh(refresh + 1)
                })
                .catch(err => console.log(err))

        }
    };

    const handleChange = (e) => {
        props.setFormData({ ...props.formData, [e.target.name]: e.target.value });
    };


    return (
        <>
            <div className='modal-container'>
                <h2>Update Records</h2>
                <form>
                    <input type="text"
                        value={props.formData.id}
                        name='id'
                        id='id'
                        onChange={handleChange}
                    />
                    <input type="text"
                        name='userId'
                        id='userId'
                        value={props.formData.userId}
                        onChange={handleChange}
                    />
                    <input type="text"
                    name='title'
                    id='title'
                        value={props.formData.title}
                        onChange={handleChange}
                    />
                    <textarea cols="30" rows="10"
                        value={props.formData.body}
                        name='body'
                        id='body'
                        onChange={handleChange}
                    ></textarea>
                    <div className='btn-modal'>
                        <button id='btn-modal1' onClick={() => props.setModal(false)}>Cancel</button>
                        <button id='btn-modal2' type='submit' onClick={()=>handleUpdate(props.formData.id)}>Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}
