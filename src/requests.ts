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
  messages: string[]
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
    const data = await response.json()
    console.log(data)
    return { newMessages: [...messages, currentMessage], newCurrentMessage: '' }
  } catch (error) {
    console.error('Error:', error)
    return { newMessages: messages, newCurrentMessage: currentMessage }
  }
}

export const receiveNotification = async (authData: AuthProps) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${authData.idInstance}/receiveNotification/${authData.apiTokenInstance}`
  )
  const data = await response.json()

  if (data.body && data.body.messageData) {
    console.log(data.body.messageData, data.receiptId)
    if (data.body.messageData.textMessageData) {
      console.log(data.body.messageData.textMessageData, data.receiptId)
    }
    if (data.body.messageData.extendedTextMessageData) {
      console.log(data.body.messageData.extendedTextMessageData, data.receiptId)
    }
  }

  return data.receiptId
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
    const newReceiptId = await receiveNotification(authData)
    return { success: true, receiptId: newReceiptId }
  } catch (error) {
    console.error('Error:', error)
    return { success: false, error: error }
  }
}
