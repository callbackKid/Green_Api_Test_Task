import { AuthProps } from './types'

export const getSettings = async (authData: AuthProps) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${authData.idInstance}/getSettings/${authData.apiTokenInstance}`
  )
  const data = await response.json()
  return console.log(data)
}

export const sendMessage = async (
  authData: AuthProps,
  currentMessage: string,
  messages: { content: string; type: 'sent' | 'received' }[]
) => {
  try {
    const response = await fetch(
      `https://api.green-api.com/waInstance${authData.idInstance}/sendMessage/${authData.apiTokenInstance}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: `${authData.phoneNumber}@c.us`,
          message: currentMessage,
        }),
      }
    )
    await response.json()
    return {
      newMessages: [...messages, { content: currentMessage, type: 'sent' as 'sent' }],
      newCurrentMessage: '',
    }
  } catch (error) {
    console.error('Error:', error)
    return { newMessages: messages, newCurrentMessage: currentMessage }
  }
}

export const receiveNotification = async (authData: AuthProps) => {
  console.log(Math.random())
  const response = await fetch(
    `https://api.green-api.com/waInstance${authData.idInstance}/receiveNotification/${authData.apiTokenInstance}`
  )
  const data = await response.json()
  let message = null
  if (data === null) return { receiptId: '', message: '' }

  if (data.body && data.body.messageData) {
    if (data.body.messageData.textMessageData) {
      message = data.body.messageData.textMessageData.textMessage
    }
    if (data.body.messageData.extendedTextMessageData) {
      message = data.body.messageData.extendedTextMessageData.text
    }
  }

  return { receiptId: data.receiptId, message: message }
}

export const deleteNotification = async (authData: AuthProps, receiptId: string) => {
  try {
    const response = await fetch(
      `https://api.green-api.com/waInstance${authData.idInstance}/deleteNotification/${authData.apiTokenInstance}/${receiptId}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return { success: true }
  } catch (error) {
    console.error('Error:', error)
    return { success: false, error: error }
  }
}
