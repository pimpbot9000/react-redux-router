import React from 'react'
import { connect } from 'react-redux'
import { toggleImportanceOf, updateNote } from '../reducers/noteReducer'

const NoteConnect = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const NotesConnect = (props) => {   

  const handleClick = async (note) => {    
       
    props.updateNote({
      ...note,
      important: !note.important
    })
  }

  return(
    <ul>
      {props.notes.map(note =>
        <NoteConnect
          key={note.id}
          note={note}
          handleClick={() => handleClick(note)}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  if ( state.filter === 'ALL' ) {
    return {
      notes: state.notes
    }
  }

  return {
    notes: (state.filter  === 'IMPORTANT' 
    ? state.notes.filter(note => note.important)
    : state.notes.filter(note => !note.important)
    )
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
  updateNote
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesConnect)