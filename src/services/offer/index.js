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

export function updateOffer(uid, offer) {
  console.log("update");
  const database = getDatabase();
  const offerRef = ref(database, `offers/${uid}`);
  const now = new Date();
  const updatedAt = JSON.stringify(now);

  const offerWithTimestamp = {
    ...offer,
    createdAt: JSON.stringify(offer.createdAt),
    updatedAt: updatedAt,
  };
  console.log({ offerWithTimestamp });

  return update(offerRef, offerWithTimestamp);
}

export function deleteOffer(uid) {
  console.log("delete");
  const database = getDatabase();
  const offerRef = ref(database, `offers/${uid}`);

  return remove(offerRef);
}
