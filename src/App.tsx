import { useEffect, useState } from 'react'
import './App.css'
import { Chat } from './components/ChatComponent'
import { LoginForm } from './components/LoginForm'

function App() {
  const [login, setLogin] = useState(true)
  useEffect(() => {
    const a = fetch(
      'https://api.green-api.com/waInstance1101824760/getSettings/858482aca4224a97bbc522c3bf3279f0bf62d9f011ca40d5aa'
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
    console.log(a)
  })

  return <div className="App">{login ? <LoginForm setLogin={setLogin} /> : <Chat />}</div>
}

export default App
