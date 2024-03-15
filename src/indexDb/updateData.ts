import { SingleCommentInterface } from "../types";
import { StorageEnum } from "./initDb";

export const updateData = (
  storeName: StorageEnum,
  id: string,
  comment: string,
  userName: string
): Promise<SingleCommentInterface | string | null> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDB", 2);
    request.onsuccess = (evt: any) => {
      const db = evt.target.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const requestGet = store.get(id);

      requestGet.onsuccess = (evt: any) => {
        const data: SingleCommentInterface = evt.target.result;
        data.comment = comment;
        data.userName = userName;
        data.editedDate = new Date().toISOString();
        const updateRequest = store.put(data);
        updateRequest.onsuccess = () => {
          resolve(data);
        };
        updateRequest.onerror = () => {
          reject();
        };
      };
      tx.onerror = () => {
        reject();
      };
    };
  });
};
