import { getDatabase, push, ref, remove, update } from "firebase/database";

export function setReceipt(receipt) {
  const database = getDatabase();
  const receiptsRef = ref(database, `receipts/`);
  const now = new Date();
  const createdAt = JSON.stringify(now);
  const updatedAt = JSON.stringify(now);

  const receiptWithTimestamp = { ...receipt, createdAt: createdAt, updatedAt: updatedAt };
  console.log({ receiptWithTimestamp });

  return push(receiptsRef, receiptWithTimestamp);
}
