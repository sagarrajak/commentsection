import { StorageEnum } from "./initDb";

export const addData = <T>(
  storeName: StorageEnum,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDB", 2);
    request.onsuccess = (evt: any) => {
      // console.log(evt)
      const db = evt.target.result;
      console.log("request.onsuccess - addData", data);
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const addRequest = store.add(data);
      addRequest.onsuccess = () => {
        resolve(data);
      };
      tx.onerror = () => {
        reject();
      };
    };

    request.onerror = () => {
      reject(false);
    };
  });
};
