import Context from './NoteContext';
import React, { useState } from 'react';
const NoteState = (props) => {
    const host = "http://localhost:5000"

    const startingnotes = []

    const [notes, setnotes] = useState(startingnotes)


    //Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setnotes(json)
    }
    //Add a note
    const addnote = async (title, description) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        });
        const json = response.json();   
    }
    //Delete a note
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        const newNote = notes.filter((note) => { return note._id !== id })
        setnotes(newNote);
    }

    //Edit a note
    const editnote = async (id, title, description) => {
        // Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ id,title, description })
        });
        const json = response.json();


        //Logic to edit in client side
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
            }

        }
    }

    return (
        <Context.Provider value={{ notes, setnotes, addnote, deletenote, editnote, getNotes }}>
            {props.children}
        </Context.Provider>
    )
}

export default NoteState;