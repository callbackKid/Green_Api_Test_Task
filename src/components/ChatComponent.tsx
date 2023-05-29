import './chatStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContextProps } from '../types'
import AuthContext from '../context'
import { deleteNotification, getSettings, receiveNotification, sendMessage } from '../requests'

export const Chat = () => {
  const { authData } = useContext<AuthContextProps>(AuthContext)

  const [messages, setMessages] = useState<string[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [receiptId, setReceiptId] = useState<string | null>(null)

  useEffect(() => {
    getSettings(authData)
  }, [authData])

  useEffect(() => {
    const fetchNotification = async () => {
      const receipt = await receiveNotification(authData)
      setReceiptId(receipt)
    }
    fetchNotification()
  }, [receiptId, authData])

  useEffect(() => {
    const deleteNotificationA = async () => {
      if (receiptId) {
        await deleteNotification(authData, receiptId)
      }
    }
    deleteNotificationA()
  }, [receiptId, authData])

  useEffect(() => {
    const deleteAndReceiveNotification = async () => {
      if (receiptId) {
        const deleteResult = await deleteNotification(authData, receiptId)
        if (deleteResult.success && deleteResult.receiptId) {
          setReceiptId(deleteResult.receiptId)
        } else {
          console.error('Failed to delete message:', deleteResult.error)
        }
      }
    }
    deleteAndReceiveNotification()
  }, [receiptId, authData])

  const sendMessageHandler = async (e: FormEvent) => {
    e.preventDefault()
    const { newMessages, newCurrentMessage } = await sendMessage(authData, currentMessage, messages)
    setMessages(newMessages)
    setCurrentMessage(newCurrentMessage)
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
