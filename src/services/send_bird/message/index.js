import axios from "axios";

/**
 *
 * @param {string} channel_type Specifies the type of the channel. Acceptable values are open_channels and group_channels.
 * @param {string} channel_url Specifies the URL of the target channel.
 * @param {object} message must have message_type, user_id, and message
 * @returns Promise
 */
export async function sendSendBirdMessage(channel_type, channel_url, message) {
  return axios
    .post(
      `https://api-${process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID}.sendbird.com/v3/${channel_type}/${channel_url}/messages`,
      message,
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
