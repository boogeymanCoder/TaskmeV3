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

export function updateReceipt(uid, receipt) {
  console.log("update:", { uid, receipt });
  const database = getDatabase();
  const receiptRef = ref(database, `receipts/${uid}`);
  const now = new Date();
  const updatedAt = JSON.stringify(now);

  const receiptWithTimestamp = {
    ...receipt,
    createdAt: JSON.stringify(receipt.createdAt),
    updatedAt: updatedAt,
  };
  console.log({ receiptWithTimestamp });

  return update(receiptRef, receiptWithTimestamp);
}
