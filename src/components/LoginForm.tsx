import { FormEvent, useState } from 'react'
import './formStyles.css'

interface LoginFormProps {
  setLogin: (login: boolean) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {
  const [id, setId] = useState('')
  const [token, setToken] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log('Submitted:', { id, token, phone })
    setLogin(false)
    fetch(`https://api.green-api.com/waInstance${id}/setSettings/${token}`)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="id">ID</label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(event) => setId(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="token">Token</label>
        <input
          id="token"
          type="text"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          value={phone}
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
