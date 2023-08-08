import React from 'react'
import "./FetchApiRee.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../../Components/Card/Card';
import { Form } from '../../Components/Form/Form';
export const FetchApiRee = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        console.log(res);
        setUsers(res.data.data);

      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <>
      <Form users={users} setUsers={setUsers} />
      <div className='main-container'>

        {
          users.map((u, index) => (
            <Card key={index} id={u.id} img={u.avatar} firstname={u.first_name} lastname={u.last_name} email={u.email} users={users} setUsers={setUsers}  />
          ))
        }

      </div>
    </>
  )
}
