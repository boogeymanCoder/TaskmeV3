import axios from "axios";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";
import { createSendBirdAccount, updateSendBirdAccount } from "../send_bird/account";

export async function setAccount(uid, account, user, isUpdate = false) {
  console.log("set account:", { uid, user, account, isUpdate });
  const database = getDatabase();
  const accountRef = ref(database, `accounts/${uid}`);
  console.log({ uid, account });

  return update(accountRef, account).then((res) => {
    console.log({ api_token: process.env.NEXT_PUBLIC_SENDBIRD_API_TOKEN });
    if (!isUpdate) {
      return createSendBirdAccount({
        user_id: uid,
        nickname: account.fullname,
        profile_url: user.photoURL,
      });
    } else {
      return updateSendBirdAccount(uid, {
        nickname: account.fullname,
        profile_url: user.photoURL,
      });
    }
  });
}

export function logOutAccount() {
  const auth = getAuth();

  return auth.signOut();
}
