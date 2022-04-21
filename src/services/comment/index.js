import { getDatabase, push, ref, remove, update } from "firebase/database";

export function setComment(comment) {
  console.log({ comment });
  const database = getDatabase();
  const commentsRef = ref(database, "comments");
  const now = new Date();
  const commentWithTimestamp = {
    ...comment,
    createdAt: JSON.stringify(now),
    updatedAt: JSON.stringify(now),
  };

  return push(commentsRef, commentWithTimestamp);
}
