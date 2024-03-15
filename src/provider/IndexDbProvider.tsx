import { useContext, useEffect, useState } from "react";
import { initDb } from "../indexDb/initDb";
import React from "react";

const DbContext = React.createContext<{ db: any } | undefined>(undefined);
export const IndexDbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isIndexDBReady, setIsIndexDbReady] = useState<boolean>(false);
  const [db, setDb] = useState<any>();

  useEffect(function () {
    setIsIndexDbReady(false);
    initDb()
      .then((db) => {
        setDb(db)
        setIsIndexDbReady(true);
      })
      .catch(() => {
        setDb(undefined)
        setIsIndexDbReady(true);
      });
  }, []);

  return (
    <DbContext.Provider value={{ db }}>
      {isIndexDBReady ? children : <h1>Please wait....</h1>}
    </DbContext.Provider>
  );
};


export const useDbContext = () => {
  const context = useContext(DbContext);
  if (context === undefined) {
    throw new Error("No DB Context Found!");
  }
  return context;
};