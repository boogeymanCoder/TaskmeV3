import { getDatabase, push, ref, update } from "firebase/database";

export function setTask(task) {
  console.log({ task });
  const database = getDatabase();
  const tasksRef = ref(database, `tasks`);

  return push(tasksRef, task);
}
export function updateTask(uid, task) {
  console.log("update");
  console.log({ task });
  const database = getDatabase();
  const taskRef = ref(database, `tasks/${uid}`);

  return update(taskRef, task);
}
