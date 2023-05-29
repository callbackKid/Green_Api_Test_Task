import './chatStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContextProps } from '../types'
import AuthContext from '../context'

export const Chat = () => {
  const { authData } = useContext<AuthContextProps>(AuthContext)

  const [messages, setMessages] = useState<string[]>([
    'What happened last night?',
    'You were drunk.',
  ])
  const [currentMessage, setCurrentMessage] = useState<string>('')

  useEffect(() => {
    const data = fetch(
      `https://api.green-api.com/waInstance${authData.idInstance}/getSettings/${authData.apiTokenInstance}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
    console.log(data)
  })

  const sendMessage = (e: FormEvent) => {
    e.preventDefault()
    // setMessages([...messages, currentMessage])
    // setCurrentMessage('')
    fetch(
      `https://api.green-api.com/waInstance${authData.idInstance}/sendMessage/${authData.apiTokenInstance}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: '995591165224@c.us',
          message: currentMessage,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMessages([...messages, currentMessage])
        setCurrentMessage('')
      })
      .catch((error) => console.error('Error:', error))
  }

  return (
    <div className="screen">
      <div className="chat-container">
        <div className="user-bar">
          <div className="name">
            <span>{authData.phoneNumber}</span>
            <span className="status">online</span>
          </div>
        </div>

        <div className="conversation">
          <div className="conversation-container">
            {messages.map((message, i) => (
              <div key={i} className="message sent">
                {message}
              </div>
            ))}
          </div>

          <form className="conversation-compose" onSubmit={sendMessage}>
            <input
              className="input-msg"
              name="input"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type a message"
            ></input>
            <button className="send">
              <div className="circle">
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
