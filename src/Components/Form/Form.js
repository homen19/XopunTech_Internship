import React from 'react'
import "./Form.css";
import { useState } from 'react';
import axios from 'axios';


export const Form = (props) => {
    const [formData, setFormData] = useState({
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
    });
    const { id, email, first_name, last_name, avatar} = formData;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if(id && email && first_name && last_name && avatar){
            axios.post('https://reqres.in/api/users', formData)
            .then(res => {
                console.log("Posting Data", res);
                props.setUsers([...props.users, res.data]);
                alert("Data submitted!!!");
                setFormData({id:"", email:"", first_name:"", last_name:"", avatar:""});
            })
            .catch(err => console.log(err))
         }
        }
    return (
        <>
            <div className="form-main">
                
                <form action="post" onSubmit={submitHandler}>
                    <h2>Post Data📩</h2>
                    <input type="text" value={id} name='id' placeholder='enter your id' onChange={handleChange} />
                    <input type="email" value={email} name='email' placeholder='enter your email' onChange={handleChange} />
                    <input type="text" value={first_name} name='first_name' placeholder='enter your first_name' onChange={handleChange} />
                    <input type="text" value={last_name} name='last_name' placeholder='enter your last_name' onChange={handleChange} />
                    <input type="text" value={avatar} name='avatar' placeholder='enter image url' onChange={handleChange} />
                    <br />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}
