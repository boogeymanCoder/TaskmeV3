import { getDatabase, push, ref, remove, update } from "firebase/database";

export function setPost(post) {
  const database = getDatabase();
  const postsRef = ref(database, `posts/`);
  const now = new Date();
  const createdAt = JSON.stringify(now);
  const updatedAt = JSON.stringify(now);

  const postWithTimestamp = { ...post, createdAt: createdAt, updatedAt: updatedAt };
  console.log({ postWithTimestamp });

  return push(postsRef, postWithTimestamp);
}
