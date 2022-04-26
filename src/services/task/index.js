import { getDatabase, push, ref, remove, update } from "firebase/database";

export function setTask(task) {
  console.log("setTask:", { task });
  const database = getDatabase();
  const tasksRef = ref(database, `tasks`);
  const now = new Date();
  const createdAt = JSON.stringify(now);
  const updatedAt = JSON.stringify(now);

  const taskWithTimestamp = { ...task, createdAt: createdAt, updatedAt: updatedAt };
  console.log({ taskWithTimestamp });

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

export function updateTaskUps(uid, ups) {
  console.log("update");
  const database = getDatabase();
  const taskRef = ref(database, `tasks/${uid}`);
  console.log("update ups:", ups);

  return update(taskRef, { ups: ups });
}

export function deleteTask(uid) {
  console.log("delete");
  const database = getDatabase();
  const taskRef = ref(database, `tasks/${uid}`);

  return remove(taskRef);
}
