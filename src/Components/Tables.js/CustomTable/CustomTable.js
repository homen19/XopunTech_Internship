import React from 'react'
import "./CustomTable.css";
import { useState } from 'react';
import axios from 'axios';



export const CustomTable = (props) => {



  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 7;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = props.data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(props.data.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);


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

  


  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <tr>
                {props.columns.map((head, headID) =>
                  <th key={headID} >{head.title}{head.icon}</th>)}
              </tr>
            </tr>
          </thead>
          <tbody>
            {
              records.map((item) => (
                <tr key={item.id}>
                  {props.columns.map((column) => {
                    
                    return(
                      <td key={column.name}>
                      {column.render? (
                        column.render(item)
                        
                      ) : (

                        item[column.dataIndex]
                      )}
                    </td>
                    )
                  })}

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
        

      </div>
    </>

  )
}
