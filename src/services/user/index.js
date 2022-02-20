import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";

export function setAccount(uid, account) {
  const database = getDatabase();
  const accountRef = ref(database, `accounts/${uid}`);
  console.log({ uid, account });

  return update(accountRef, account);
}

export function logOutAccount() {
  const auth = getAuth();

  return auth.signOut();
}
