import axios from "axios";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";

export async function setAccount(uid, account, user, isUpdate = false) {
  console.log("set account:", { uid, user, account, isUpdate });
  const database = getDatabase();
  const accountRef = ref(database, `accounts/${uid}`);
  console.log({ uid, account });

  return update(accountRef, account).then((res) => {
    console.log({ api_token: process.env.NEXT_PUBLIC_SENDBIRD_API_TOKEN });
    if (!isUpdate) {
      axios
        .post(
          `https://api-${process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users`,
          {
            user_id: uid,
            nickname: account.fullname,
            profile_url: user.photoURL,
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf8",
              "Api-Token": process.env.NEXT_PUBLIC_SENDBIRD_API_TOKEN,
            },
          }
        )
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }));
    } else {
      axios
        .put(
          `https://api-${process.env.NEXT_PUBLIC_SENDBIRD_APPLICATION_ID}.sendbird.com/v3/users/${uid}`,
          {
            nickname: account.fullname,
            profile_url: user.photoURL,
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf8",
              "Api-Token": process.env.NEXT_PUBLIC_SENDBIRD_API_TOKEN,
            },
          }
        )
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }));
    }
  });
}

export function logOutAccount() {
  const auth = getAuth();

  return auth.signOut();
}
