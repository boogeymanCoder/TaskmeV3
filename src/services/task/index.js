import { addDoc, collection, getFirestore } from "firebase/firestore";

export function setTask(task) {
  console.log({ task });
  const firestore = getFirestore();
  const tasksRef = collection(firestore, `tasks`);

  return addDoc(tasksRef, task);
}
