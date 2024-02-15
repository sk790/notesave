import React from 'react'
import Context from '../context/notes/NoteContext'
import { useContext, useState } from 'react'

const Addnote = (props) => {
  const {showalert} = props;
  const context = useContext(Context)
  const { addnote } = context
  const [note, setnote] = useState({ title: "", description: ""})

  const add = (e) => {
    e.preventDefault();
    addnote(note.title, note.description,showalert)
    showalert("Note saved successfully","success");
    setnote({ title: "", description: "" })
    
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-3'>
      <h1>Add Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input required type="text" className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" onChange={onchange} />
        </div>
        <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea required type = "text" className="form-control" id="description" value={note.description} name='description' onChange={onchange} rows="3"></textarea>
        </div>

        <button disabled = {note.title.length < 3 || note.description.length < 5} onClick={add} type="submit" className="btn btn-primary">Add Note</button>
      </form>
    </div>
  )
}

export default Addnote
