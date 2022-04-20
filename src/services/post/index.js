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

export function updatePost(uid, post) {
  console.log("update");
  const database = getDatabase();
  const postRef = ref(database, `posts/${uid}`);
  const now = new Date();
  const updatedAt = JSON.stringify(now);

  const postWithTimestamp = {
    ...post,
    createdAt: JSON.stringify(post.createdAt),
    updatedAt: updatedAt,
  };
  console.log({ postWithTimestamp });

  return update(postRef, postWithTimestamp);
}

export function deletePost(uid) {
  console.log("delete");
  const database = getDatabase();
  const postRef = ref(database, `posts/${uid}`);

  return remove(postRef);
}
