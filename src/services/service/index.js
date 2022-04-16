import { getDatabase, push, ref } from "firebase/database";

export function setService(service) {
  const database = getDatabase();
  const servicesRef = ref(database, `services/`);
  const now = new Date();
  const createdAt = JSON.stringify(now);
  const updatedAt = JSON.stringify(now);

  const serviceWithTimestamp = { ...service, createdAt: createdAt, updatedAt: updatedAt };
  console.log({ serviceWithTimestamp });

  return push(servicesRef, serviceWithTimestamp);
}
