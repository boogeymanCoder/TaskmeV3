import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export function setAccount(uid, account) {
  console.log({ uid, account });
  const firestore = getFirestore();
  const accountRef = doc(firestore, `accounts/${uid}`);

  return setDoc(accountRef, account);
}

export function logOutAccount() {
  const auth = getAuth();

  return auth.signOut();
}
