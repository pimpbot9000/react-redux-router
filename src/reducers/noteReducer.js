import noteService from "../services/notes"

const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return [...state, action.data]
        case 'TOGGLE_IMPORTANCE':
            {
                const id = action.data.id
                const noteToChange = state.find(note => note.id === action.data.id)
                let changedNote = {
                    ...noteToChange,
                    important: !noteToChange.important
                }
                return state.map(note => note.id !== id ? note : changedNote)
            }
        case 'UPDATE_NOTE':
            {
                const id = action.data.id
                return state.map(note => note.id !== action.data.id ? note : action.data)
            }
        case 'INIT_NOTES':
            return action.data
        default:
            return state
    }
}


export const updateNote = (note) => {
    return async dispatch => {
        const updatedNote = await noteService.update(note)
        dispatch({
            type: 'UPDATE_NOTE',
            data: updatedNote
        })
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        data: { id }
    }
}

// async action creator
export const createNote = (content) => {

    return async dispatch => {
        const newNote = await noteService.createNew(content) // returns {content, important, id}
        console.log(newNote)
        console.log(newNote)
        dispatch({
            type: 'NEW_NOTE',
            data: newNote
        })
    }
}

// async initializeNotes (redux-thunk middleware must be enabled, see store.js)
export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch({
            type: 'INIT_NOTES',
            data: notes,
        })
    }
}

//sync initialize Notes
export const initializeNotesSync = (notes) => {
    return {
        type: 'INIT_NOTES',
        data: notes
    }
}

export default noteReducer