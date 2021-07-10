import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewNote from './components/NewNote'
import Notes, { Note } from './components/Notes'
//import Note from './components/Notes'
import NotesConnect from './components/NotesConnect'
import VisibilityFilter from './components/visibilityFilter'
import { initializeNotes, initializeNotesSync } from './reducers/noteReducer'
import noteService from './services/notes'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch, withRouter
} from "react-router-dom"


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // without thunk (initialize Notes must be synchronous)
    //noteService.getAll().then(notes => dispatch(initializeNotesSync(notes)))
    console.log("use effect!")
    // with thunk (async initializeNotes)
    dispatch(initializeNotes())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  
  //^ one can use [dispatch]
  const padding = {
    padding: 5
  }

  
  //const match = useRouteMatch('/notes/:id')
  const notes = useSelector(state => state.notes)
  console.log("notes", notes)
  // Ordering matters, "/" must be last!
  return (
    <>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/notes/:id">
          <Note />
        </Route>

        <Route path="/notes">
          <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
          </div>
        </Route>


        <Route path="/users">
          <div>
            <p>Users!</p>
          </div>
        </Route>

        <Route path="/">
          <div>
            <p>Home!</p>
          </div>
        </Route>

      </Switch>
      <p>Hello</p>
    </>
  )
}

export default App;
