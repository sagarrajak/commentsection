import { StorageEnum } from "./initDb";

export const deleteData = (
  storeName: StorageEnum,
  id: string | string[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDB");
    request.onsuccess = (evt: any) => {
      const db = evt.target.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const requestDelete = store.delete(id);

      requestDelete.onsuccess = () => {
        resolve();
      };
      tx.onerror = () => {
        reject();
      };
    };
  });
};
