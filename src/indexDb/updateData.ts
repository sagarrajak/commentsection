import { SingleCommentInterface } from "../types";
import { StorageEnum } from "./initDb";

export const updateData = (
    db: any,
    storeName: StorageEnum,
    id: string,
    comment: string
): Promise<SingleCommentInterface | string | null> => {

    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.get(id);

        request.onsuccess = (evt: any) => {
            const data: SingleCommentInterface = evt.target.result;
            data.comment = comment;
            data.editedDate = new Date().toISOString();
            const updateRequest = store.put(data)
            updateRequest.onsuccess = () => {
                resolve(data);
            }
            updateRequest.onerror = () => {
                reject();
            }
        };
        tx.onerror = () => {
            reject();
        }
    });
};
