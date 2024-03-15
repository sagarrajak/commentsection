export enum StorageEnum {
    comments = "comments",
}

export const initDb = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        // open the connection
        const request = indexedDB.open('myDB');
        let db, version;

        request.onupgradeneeded = () => {
            db = request.result;
            // if the data object store doesn't exist, create it
            if (!db.objectStoreNames.contains(StorageEnum.comments)) {
                console.log('Creating users store');
                db.createObjectStore(StorageEnum.comments, { keyPath: 'id' });
            }
            // no need to resolve here
        };

        request.onsuccess = () => {
            db = request.result;
            version = db.version;
            resolve(db);
        };

        request.onerror = () => {
            reject();
        };
    });
}