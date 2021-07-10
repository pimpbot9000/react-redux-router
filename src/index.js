import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom"

import { shallowEqual } from 'react-redux'

const a = {"b": "tuomas", "c": "heikki"}
const c = {"b": "tuomas", "c": "heikki"}
console.log("are equal", c == a)
ReactDOM.render(
  <Router>
  <Provider store={store}>
    
      <App />
    
  </Provider>
  </Router>
  ,
  document.getElementById('root')
)


