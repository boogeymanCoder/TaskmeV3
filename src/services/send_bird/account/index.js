import axios from "axios";

export async function createSendBirdAccount(account) {
  return axios
    .post(
      `https://api-${process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users`,
      account,
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

export async function updateSendBirdAccount(uid, account) {
  return axios
    .put(
      `https://api-${process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users/${uid}`,
      account,
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
