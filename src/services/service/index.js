import { getDatabase, push, ref } from "firebase/database";

export function setService(service, uid) {
  if (!uid) return Promise.reject("setService Error: uid required");

  const database = getDatabase();
  const servicesRef = ref(database, `services/${uid}`);
  const now = new Date();
  const createdAt = JSON.stringify(now);
  const updatedAt = JSON.stringify(now);

  const serviceWithTimestamp = { ...service, createdAt: createdAt, updatedAt: updatedAt };
  console.log({ serviceWithTimestamp });

  return push(servicesRef, serviceWithTimestamp);
}
