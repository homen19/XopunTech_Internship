import React from 'react'
import "./CustomTable.css";
import { useState } from 'react';
import axios from 'axios';
import { Modal } from './Components/Modal';


export const CustomTable = (props) => {

  console.log(props.columns);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 7;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = props.data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(props.data.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const [isEditing, setisEditing] = useState(false);


  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }

  const changePage = (id) => {
    setCurrentPage(id)
  }

  const handleEdit = (id) => {
    setisEditing(true);
  }


  const handleDelete = (deleteID) => {
    // alert(deleteID)
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteID}`)
      .then(res => {
        console.log("Data deleted :", res);
        console.log(res.data);

        const posts = props.data.filter(item => item.id !== deleteID);
        props.setData(posts);
        alert("Deleted!!!")

      })
      .catch(err => console.log(err))
  };




  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <tr>
                {props.columns.map((head, headID) =>
                  <th key={headID} >{head.title}</th>)}
              </tr>
              {/* <th>ID</th>
              <th>USER ID</th>
              <th>TITLE</th>
              <th>BODY</th>
              <th>ACTION</th> */}
            </tr>
          </thead>
          <tbody>
            {
              records.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.userId}</td>

                  <td>{d.title}</td>
                  <td>{d.body}</td>
                  <td>
                    <button id='btn-1' onClick={() => handleEdit(d.id)} >Edit</button>
                    <button id='btn-2' onClick={() => handleDelete(d.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
        <div className='pagination-container'>
          <ul className='pagination'>
            <li className='page-item'>
              <a href="#" className='page-link' onClick={prePage}>Prev</a>
            </li>
            {
              numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <a href="#" className='page-item' onClick={() => changePage(n)}>{n}</a>
                </li>
              ))
            }
            <li className='page-item'>
              <a href="#" className='page-link' onClick={nextPage}>Next</a>
            </li>

          </ul>
        </div>
        {/* <Modal /> */}

      </div>
    </>

  )
}
