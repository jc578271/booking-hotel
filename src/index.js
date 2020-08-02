import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import configureStore from './store/configureStore'
import { firebase } from './firebase'

import { startSetBookings } from './actions/bookings'
import { startSetRooms } from './actions/rooms'
import { startSetServices } from './actions/services'
import { login, logout } from './actions/auth'

const store = configureStore()

const App = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes {...props}/>
      </BrowserRouter>
    </Provider>
    
  )
}

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    store.dispatch(login(user.uid))
    store.dispatch(startSetBookings())
    .then(() => store.dispatch(startSetRooms()))
    .then(() => store.dispatch(startSetServices()))
    .then(() => {
      ReactDOM.render(
          <App user={user}/>,
        document.getElementById('root')
      )
    })
  } else {
    store.dispatch(logout())
    ReactDOM.render(
      <App user={user}/>,
    document.getElementById('root')
  )
  }
})




