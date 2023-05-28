import { createContext } from 'react'
import { AuthContextProps } from './types'

const AuthContext = createContext<AuthContextProps>({
  authData: { idInstance: '', apiTokenInstance: '', phoneNumber: '' },
  setAuthData: () => undefined,
})
export default AuthContext
