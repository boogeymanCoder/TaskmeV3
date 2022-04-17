import { getDatabase, push, ref, remove, update } from "firebase/database";

export function setOffer(offer) {
  console.log({ offer });
  const database = getDatabase();
  const offersRef = ref(database, "offers");
  const now = new Date();
  const offerWithTimestamp = {
    ...offer,
    createdAt: JSON.stringify(now),
    updatedAt: JSON.stringify(now),
  };

  return push(offersRef, offerWithTimestamp);
}
