import React, { useEffect, useState } from "react";
import { findAllData } from "../indexDb/findAllData";
import { StorageEnum, initDb } from "../indexDb/initDb";
import { buildCommentTreeAction } from "../slice/comment.slice";
import { useAppDispatch } from "../store/store";

export const IndexDbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isIndexDBReady, setIsIndexDbReady] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(function () {
    setIsIndexDbReady(false);
    initDb()
      .then(() => {
        setIsIndexDbReady(true);
      })
      .then(() => {
        return findAllData(StorageEnum.comments);
      })
      .then((res: any) => {
        console.log("indexDbData", res);
        if (res) dispatch(buildCommentTreeAction({ comments: res }));
      })
      .catch(() => {
        setIsIndexDbReady(true);
      });
  }, []);

  return <>{isIndexDBReady ? children : <h1>Please wait....</h1>}</>;
};
