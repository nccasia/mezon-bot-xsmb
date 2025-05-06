const sendMessage = (client, event, messageContent) => {
  const channel = client.channels.get(event?.channel_id);
  const comingMessage = channel.messages.get(event?.message_id);
  if (comingMessage) {
    comingMessage.reply({
      t: messageContent,
      mk: [{ type: "t", s: 0, e: messageContent.length }],
    },)
    return;
  }
  channel.send({
    t: messageContent,
    mk: [{ type: "t", s: 0, e: messageContent.length }],
  },)
};

module.exports = { sendMessage };
