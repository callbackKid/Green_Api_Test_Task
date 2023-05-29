import './chatStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContextProps } from '../types'
import AuthContext from '../context'
import { deleteNotification, getSettings, receiveNotification, sendMessage } from '../requests'
import { useCallback } from 'react'

export const Chat = () => {
  const { authData } = useContext<AuthContextProps>(AuthContext)

  const [messages, setMessages] = useState<{ content: string; type: 'sent' | 'received' }[]>([
    { content: 'A', type: 'sent' },
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [receiptId, setReceiptId] = useState(null)
  const [messageDeleted, setMessageDeleted] = useState(false)

  useEffect(() => {
    getSettings(authData)
  }, [authData])

  const fetchNotification = useCallback(async () => {
    if (!messageDeleted) {
      const { receiptId, message } = await receiveNotification(authData)
      if (receiptId) {
        setReceiptId(receiptId)
      }
      if (message) {
        setMessages((prevMessages) => [...prevMessages, { content: message, type: 'received' }])
      }
    } else {
      setMessageDeleted(false)
    }
  }, [])

  useEffect(() => {
    fetchNotification()
    const intervalId = setInterval(fetchNotification, 10000)
    return () => clearInterval(intervalId)
  }, [fetchNotification])

  useEffect(() => {
    const deleteAndReceiveNotification = async () => {
      if (receiptId) {
        const deleteResult = await deleteNotification(authData, receiptId)
        if (deleteResult.success) {
          setMessageDeleted(true)
        } else {
          console.error('Failed to delete message:', deleteResult.error)
        }
      }
    }
    deleteAndReceiveNotification()
  }, [receiptId, authData])

  const sendMessageHandler = async (e: FormEvent) => {
    e.preventDefault()
    const result = await sendMessage(authData, currentMessage, messages)
    setMessages(result.newMessages)
    setCurrentMessage(result.newCurrentMessage)
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
              <div key={i} className={`message ${message.type}`}>
                {message.content}
              </div>
            ))}
          </div>

          <form className="conversation-compose" onSubmit={sendMessageHandler}>
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
