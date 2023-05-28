import { useState } from 'react'
import './App.css'
import { Chat } from './components/ChatComponent'
import { LoginForm } from './components/LoginForm'
import AuthContext from './context'

function App() {
  const [login, setLogin] = useState(true)
  const [authData, setAuthData] = useState({
    idInstance: '',
    apiTokenInstance: '',
    phoneNumber: '',
  })

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      <div className="App">{login ? <LoginForm setLogin={setLogin} /> : <Chat />}</div>
    </AuthContext.Provider>
  )
}

export default App
