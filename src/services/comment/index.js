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

export function updateComment(uid, comment) {
  console.log("update", { comment });
  const database = getDatabase();
  const commentRef = ref(database, `comments/${uid}`);
  const now = new Date();
  const updatedAt = JSON.stringify(now);

  const commentWithTimestamp = {
    ...comment,
    createdAt: comment.createdAt,
    updatedAt: updatedAt,
  };
  console.log({ commentWithTimestamp });

  return update(commentRef, commentWithTimestamp);
}
