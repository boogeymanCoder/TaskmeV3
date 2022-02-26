import { getDatabase, push, ref, update } from "firebase/database";

export function setTask(task) {
  console.log({ task });
  const database = getDatabase();
  const tasksRef = ref(database, `tasks`);
  const now = new Date();
  const createdAt = JSON.stringify(now);
  const updatedAt = JSON.stringify(now);

  const taskWithTimestamp = { ...task, createdAt: createdAt, updatedAt: updatedAt };

  return push(tasksRef, taskWithTimestamp);
}
export function updateTask(uid, task) {
  console.log("update");
  const database = getDatabase();
  const taskRef = ref(database, `tasks/${uid}`);
  const now = new Date();
  const updatedAt = JSON.stringify(now);

  const taskWithTimestamp = {
    ...task,
    createdAt: JSON.stringify(task.createdAt),
    updatedAt: updatedAt,
  };
  console.log({ taskWithTimestamp });

  return update(taskRef, taskWithTimestamp);
}
