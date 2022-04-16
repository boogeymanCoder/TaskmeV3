import { getDatabase, push, ref, update } from "firebase/database";

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

export function updateService(uid, service) {
  console.log("update");
  const database = getDatabase();
  const serviceRef = ref(database, `services/${uid}`);
  const now = new Date();
  const updatedAt = JSON.stringify(now);

  const serviceWithTimestamp = {
    ...service,
    createdAt: JSON.stringify(service.createdAt),
    updatedAt: updatedAt,
  };
  console.log({ serviceWithTimestamp });

  return update(serviceRef, serviceWithTimestamp);
}
