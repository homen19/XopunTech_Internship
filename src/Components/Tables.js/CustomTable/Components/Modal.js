import React from 'react'
import "./Modal.css";
export const Modal = (props) => {
    return (
        <>
            <div className='modal-container'>
                <h2>Update Records</h2>
                <form action="">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div className='btn-modal'>
                        <button id='btn-modal1'>Cancel</button>
                        <button id='btn-modal2'>Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}
