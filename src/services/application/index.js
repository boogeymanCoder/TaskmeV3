import { getDatabase, push, ref, remove, update } from "firebase/database";

export function setApplication(application) {
  console.log({ application });
  const database = getDatabase();
  const applicationsRef = ref(database, "applications");
  const now = new Date();
  const applicationWithTimestamp = {
    ...application,
    createdAt: JSON.stringify(now),
    updatedAt: JSON.stringify(now),
  };

  return push(applicationsRef, applicationWithTimestamp);
}

export function updateApplication(uid, application, timestamp = true) {
  console.log({ uid, application });
  const database = getDatabase();
  const applicationsRef = ref(database, `applications/${application.uid}`);
  const now = new Date();
  const applicationWithTimestamp = {
    ...application,
    createdAt: JSON.stringify(application.createdAt),
    updatedAt: timestamp ? JSON.stringify(now) : JSON.stringify(application.updatedAt),
  };

  return update(applicationsRef, applicationWithTimestamp);
}

export function removeApplication(uid) {
  console.log({ uid });
  const database = getDatabase();
  const applicationsRef = ref(database, `applications/${uid}`);

  return remove(applicationsRef);
}
