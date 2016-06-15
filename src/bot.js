import TelegramBotClient from 'node-telegram-bot-api'

export default class Bot {
  constructor(token) {
    this.client = new TelegramBotClient(token, { polling: true })
  }

  start() {
    this.client.on('message', message => {
      if (!message.reply_to_message) {
        this.respondTo(message)
      }
    })
  }

  async respondTo(message) {
    let text = text = message.text

    while (text !== 'stop') {
      let sentMessage = await this.client.sendMessage(message.chat.id,
                                                      `echo: ${text}`,
                                                      { reply_markup: JSON.stringify({ force_reply: true }) })
      let reply = await new Promise(resolve => this.client.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id, resolve))
      text = reply.text
    }

    this.client.sendMessage(message.chat.id, 'Stopping')
  }
}
