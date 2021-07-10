import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf, updateNote } from '../reducers/noteReducer'
import { initializeNotes, initializeNotesSync } from '../reducers/noteReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"

export const Note = () => {
  const dispatch = useDispatch()

  const id = useParams().id // string  
  const note = useSelector(({ filter, notes }) => notes.find(note => note.id == id), [])
  
  const handleClick = async (note) => {
    dispatch(updateNote({
      ...note,
      important: !note.important
    }))
  }

  if (!note) return <></>

  return (
    <li onClick={() => handleClick(note)}>
      {note.content} <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {


  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link> <strong> {note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )


  /*
  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleClick(note)}
        />
      )}
    </ul>
  )*/
}

export default Notes