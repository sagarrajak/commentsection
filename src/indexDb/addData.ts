import { StorageEnum } from "./initDb";

export const addData = <T>(
    db: any,
    storeName: StorageEnum,
    data: T
): Promise<T | string | null> => {

    return new Promise((resolve, reject) => {
        console.log('request.onsuccess - addData', data);
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.add(data);
       
        request.onsuccess = () => {
            resolve(data);
        };
        tx.onerror = () => {
            reject();
        };

    });
};
