import { getDatabase, push, ref, remove, update } from "firebase/database";

export function setApplication(application) {
  console.log({ application });
  const database = getDatabase();
  const applicationsRef = ref(database, "applications");

  return push(applicationsRef, application);
}

export function updateApplication(uid, application) {
  console.log({ uid, application });
  const database = getDatabase();
  const applicationsRef = ref(database, `applications/${application.uid}`);

  return update(applicationsRef, application);
}

export function removeApplication(uid) {
  console.log({ uid });
  const database = getDatabase();
  const applicationsRef = ref(database, `applications/${uid}`);

  return remove(applicationsRef);
}
