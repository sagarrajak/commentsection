import { StorageEnum } from "./initDb";

export const deleteData = (storeName: StorageEnum, id: string | string[]) => {
  const request = indexedDB.open("myDB", 2);
  request.onsuccess = (evt: any) => {
    const db = evt.target.result;
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);

    if (Array.isArray(id)) {
      for (let deletedId of id) {
        store.delete(deletedId);
      }
    } else {
      store.delete(id);
    }
  };
};
