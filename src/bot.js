import TelegramBotClient from 'node-telegram-bot-api'

export default class Bot {
  constructor(token) {
    this.client = new TelegramBotClient(token, { polling: true })
  }

  start() {
    this.client.on('message', message => {
      this.client.sendMessage(message.chat.id, message.text)
    })
  }
}
