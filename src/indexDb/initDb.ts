export enum StorageEnum {
  comments = "comments",
}

export const initDb = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log("sdfsdfs1");
    // open the connection
    const request = indexedDB.open("myDB", 2);
    let db, version;

    request.onupgradeneeded = (event: any) => {
      db = event.target.result;

      console.log(db.objectStoreNames.contains(StorageEnum.comments));
      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(StorageEnum.comments)) {
        console.log("Creating users store");
        db.createObjectStore(StorageEnum.comments, { keyPath: "id" });
      }
      // no need to resolve here
    };

    request.onsuccess = (evt: any) => {
      // console.log(evt)
      db = evt.target.result;
      version = db.version;
      resolve(db);
    };

    request.onerror = () => {
      reject(false);
    };
  });
};
