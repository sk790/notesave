import React, { useEffect, useRef } from 'react'
import Context from '../context/notes/NoteContext'
import { useContext, useState } from 'react'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const navigate = useNavigate()
    const {showalert} = props;
    const context = useContext(Context)
    const { notes, getNotes, editnote } = context

    useEffect(() => {
        if(localStorage.getItem('token')!==null){
            getNotes()
            // eslint-disable-next-line
        }else{
            navigate('/login')
        }
    },)
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "" })

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    const ref = useRef(null);
    const refclose = useRef(null);

    const updatenote = (currentnote) => {
        ref.current.click()
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description })
    }

    const handleclick = () => {
        editnote(note.id, note.etitle, note.edescription)
        refclose.current.click();
        showalert("Updated Note Succesfull","success")
    }

    return (
        <>
            <Addnote showalert = {showalert} />
            <button ref={ref} type="button" className=" d-none btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <textarea required type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onchange} rows="3"></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick} disabled={note.etitle.length < 3 || note.edescription.length < 5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'> 
                <h2>Your Notes</h2>
                <div className='container'>
                    {notes.length === 0 && "No Notes Found"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} showalert={showalert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
