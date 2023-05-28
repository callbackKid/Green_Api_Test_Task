import './chatStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect } from 'react'
import { AuthContextProps } from '../types'
import AuthContext from '../context'

export const Chat = () => {
  const { authData } = useContext<AuthContextProps>(AuthContext)
  console.log(authData)

  useEffect(() => {
    const data = fetch(
      `https://api.green-api.com/waInstance${authData.idInstance}/getSettings/${authData.apiTokenInstance}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
    console.log(data)
  })

  return (
    <div className="screen">
      <div className="chat-container">
        <div className="user-bar">
          <div className="name">
            <span>Zeno Rocha</span>
            <span className="status">online</span>
          </div>
        </div>

        <div className="conversation">
          <div className="conversation-container">
            <div className="message sent">What happened last night?</div>
            <div className="message received">You were drunk.</div>
            <div className="message sent">No I wasn't.</div>
          </div>
          <form className="conversation-compose">
            <input className="input-msg" name="input" placeholder="Type a message"></input>
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
