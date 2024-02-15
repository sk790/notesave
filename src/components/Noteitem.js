import React from 'react'
import Context from '../context/notes/NoteContext'
import { useContext } from 'react';

const Noteitem = (props) => {
    const {showalert} = props;
    const context = useContext(Context)
    const {deletenote} = context
    const { note, updatenote } = props;
    
    const Delete = ()=>{
        deletenote(note._id)
        showalert("Deleted Note Succesfull","success")
    }
    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={Delete} ></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updatenote(note)}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
