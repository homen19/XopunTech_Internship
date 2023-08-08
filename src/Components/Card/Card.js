import React from 'react';
import "./Card.css";
import axios from 'axios';


export const Card = (props) => {
 
    
    const handleDelete = (deleteId) =>{
        axios.delete(`https://reqres.in/api/users/${deleteId}`)
        .then(res=>{
            
            console.log("Data deleted", res);
            alert("Data deleted!!!");
        })
        .catch(err=>{
            console.log(err);
        })
        // alert("Delete button is clicked");
        
    }
    return (
        <div className='card-main'>
            <div className="img-container">
                <img src={props.img} alt="" />

            </div>
            <h2>{props.firstname}</h2>
            <p>{props.email}</p>
            <div className="operation-button">
                <button className="Edit"  color="#54B4D3">Edit</button>
                <button className="Delete" onClick={()=>handleDelete(props.id)} color="#F31559">Delete</button>
            </div>
        </div>
    )
}
