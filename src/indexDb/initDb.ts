export enum StorageEnum {
  comments = "comments",
}

export const initDb = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log("sdfsdfs1");
    // open the connection
    const request = indexedDB.open("myDB", 2);
    let db;

    request.onupgradeneeded = (event: any) => {
      db = event.target.result;

      console.log(db.objectStoreNames.contains(StorageEnum.comments));
      if (!db.objectStoreNames.contains(StorageEnum.comments)) {
        console.log("Creating users store");
        db.createObjectStore(StorageEnum.comments, { keyPath: "id" });
      }
    };

    request.onsuccess = (evt: any) => {
      db = evt.target.result;
      resolve();
    };

    request.onerror = () => {
      reject();
    };
  });
};
