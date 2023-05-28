export interface AuthProps {
  idInstance: string
  apiTokenInstance: string
  phoneNumber: string
}

export interface AuthContextProps {
  authData: AuthProps
  setAuthData: (value: AuthProps) => void
}

export interface LoginFormProps {
  setLogin: (login: boolean) => void
}
