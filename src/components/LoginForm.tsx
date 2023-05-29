import { FormEvent, useContext, useState } from 'react'
import './formStyles.css'
import AuthContext from '../context'
import { AuthContextProps, LoginFormProps } from '../types'

export const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {
  const { setAuthData } = useContext<AuthContextProps>(AuthContext)
  const [idInstance, setId] = useState('')
  const [apiTokenInstance, setToken] = useState('')
  const [phoneNumber, setPhone] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setLogin(false)
    setAuthData({
      idInstance: idInstance,
      apiTokenInstance: apiTokenInstance,
      phoneNumber: phoneNumber,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="id">idInstance</label>
        <input
          id="id"
          type="text"
          value={idInstance}
          onChange={(event) => setId(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="token">apiTokenInstance</label>
        <input
          id="token"
          type="text"
          value={apiTokenInstance}
          onChange={(event) => setToken(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
      </div>
      <button className="button-form" type="submit">
        Submit
      </button>
    </form>
  )
}
