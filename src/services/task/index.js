import { getDatabase, push, ref } from "firebase/database";

export function setTask(task) {
  console.log({ task });
  const database = getDatabase();
  const tasksRef = ref(database, `tasks`);

  return push(tasksRef, task);
}
