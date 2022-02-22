import { getDatabase, push, ref, update } from "firebase/database";

export function setApplication(application) {
  console.log({ application });
  const database = getDatabase();
  const applicationsRef = ref(database, "applications");

  return push(applicationsRef, application);
}
