import React, { useContext, useEffect } from 'react'
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import './style/main.css'
import { loadingContext, userContext } from '../contexts'
import LoginPage from './LoginPage';
import { firebaseApp } from './firebase';
function App() {
  const { currentUser, setCurrentUser } = useContext(userContext)
  const { setLoading } = useContext(loadingContext)

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user)
      }
    })
    setLoading(false)
  }, [setCurrentUser, setLoading])
  return (
    !currentUser ?
      <LoginPage /> :
      (
        <div className="App">
          <div className="App-body">
            <Sidebar />
            <Chat />
          </div>
        </div>
      )
  );
}

export default App;
