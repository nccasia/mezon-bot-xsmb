const sendMessage = (client, event, messageContent) => {
  client.sendMessage(
    event?.clan_id,
    event?.channel_id,
    2,
    event?.is_public,
    {
      t: messageContent,
      mk: [{ type: "t", s: 0, e: messageContent.length }],
    },
    [],
    [],
    [
      {
        message_id: "",
        message_ref_id: event.message_id,
        ref_type: 0,
        message_sender_id: event.sender_id,
        message_sender_username: event.username,
        mesages_sender_avatar: event.avatar,
        message_sender_clan_nick: event.clan_nick,
        message_sender_display_name: event.display_name,
        content: JSON.stringify(event.content),
        has_attachment: false,
      },
    ]
  );
};

module.exports = { sendMessage };
