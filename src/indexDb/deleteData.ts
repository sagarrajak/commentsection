import { StorageEnum } from "./initDb";

export const deleteData = (
    db: any,
    storeName: StorageEnum,
    id: string | string[],
): Promise<void> => {

    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.delete(id);

        request.onsuccess = () => {
            resolve();
        };
        tx.onerror = () => {
            reject();
        }
    });
};
