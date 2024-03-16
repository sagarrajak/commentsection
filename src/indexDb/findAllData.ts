import { StorageEnum } from "./initDb";

export const findAllData = <T>(
  storeName: StorageEnum
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDB");
    request.onsuccess = (evt: any) => {
      const db = evt.target.result;
      console.log("request.onsuccess - findAllData");
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const dataArray: T[] = [];
      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (event: { target: { result: any; }; }) => {
        const cursor = event.target.result;
        if (cursor) {
          dataArray.push(cursor.value);
          cursor.continue();
        } else {
          resolve(dataArray);
        }
      };

      cursorRequest.onerror = (event: any) => {
        console.error("Cursor error:", event.target.error);
        reject("Cursor error");
      };
    };

    request.onerror = () => {
      console.error("Database open error:", request.error);
      reject("Database open error");
    };
  });
};
