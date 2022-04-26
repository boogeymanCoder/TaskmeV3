import axios from "axios";

// Sample channel data
// {
//     "name": "Saturday soccer members",
//     "channel_url": "private_chat_room_424",
//     "cover_url": "https://sendbird.com/main/img/cover/cover_08.jpg",
//     "custom_type": "sports",
//     "is_distinct": true,
//     "inviter_id": "Jay",
//     "user_ids": ["Jay", "James", "Young"],
//     "invitation_status": {
//         "James": "invited_by_friend",
//         "Young": "invited_by_non_friend"
//     },
//     "hidden_status": {
//         "Jay": "hidden_allow_auto_unhide"
//     },
//
//     "operator_ids": ["Jeff"]
// }

export async function createSendBirdChannel(channel) {
  return axios
    .post(
      `https://api-${process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID}.sendbird.com/v3/group_channels`,
      channel,
      {
        headers: {
          "Content-Type": "application/json; charset=utf8",
          "Api-Token": process.env.NEXT_PUBLIC_SENDBIRD_API_TOKEN,
        },
      }
    )
    .then((res) => {
      console.log({ res });
      return res;
    })
    .catch((err) => {
      console.log({ err });
      return err;
    });
}

/**
 * https://sendbird.com/docs/chat/v3/platform-api/channel/inviting-a-user/invite-as-members-channel
 */
export async function inviteSendBirdChannelMember(channel_url, invitation) {
  return axios
    .post(
      `https://api-${process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID}.sendbird.com/v3/group_channels/${channel_url}/invite`,
      invitation,
      {
        headers: {
          "Content-Type": "application/json; charset=utf8",
          "Api-Token": process.env.NEXT_PUBLIC_SENDBIRD_API_TOKEN,
        },
      }
    )
    .then((res) => {
      console.log({ res });
      return res;
    })
    .catch((err) => {
      console.log({ err });
      return err;
    });
}
