import { PayloadAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { CommentStruct, SingleCommentInterface } from "../types";

function dfsDelete(id: string, comment: CommentStruct) {
  if (!comment) return false;
  if (comment.id === id) {
    return true;
  }
  if (comment.replys) {
    for (let i = 0; i < comment.replys.length; i++) {
      const singleComment = comment.replys[i];
      if (dfsDelete(id, singleComment)) {
        comment.replys.splice(i, 1);
        break;
      }
    }
  }
  return false;
}

function dfsEdit(
  id: string,
  comment: CommentStruct,
  commentMessage: string,
  dateString: string
) {
  if (!comment) return false;
  if (comment.id === id) {
    comment.comment = commentMessage;
    comment.editedDate = dateString;
    return true;
  }
  if (comment.replys) {
    for (let i = 0; i < comment.replys.length; i++) {
      const singleComment = comment.replys[i];
      if (dfsEdit(id, singleComment, commentMessage, dateString)) {
        break;
      }
    }
  }
  return false;
}

function dfsAdd(parentId: string, comment: CommentStruct) {
  if (!comment) return false;
  if (comment.id === parentId) {
    if (!comment.replys) comment.replys = [];
    comment.replys.push(comment);
    return true;
  }
  if (comment.replys) {
    for (let i = 0; i < comment.replys.length; i++) {
      const singleComment = comment.replys[i];
      dfsAdd(parentId, singleComment);
    }
  }
  return false;
}

// Define a type for the slice state
interface CommentState {
  comments: CommentStruct[];
}

// Define the initial state using that type
const initialState: CommentState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "commentAction",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteCommentAction: (state, action: PayloadAction<{ id: string }>) => {
      for (let i = 0; i < state.comments.length; i++) {
        dfsDelete(action.payload.id, state.comments[i]);
      }
    },
    editCommentAction: (
      state,
      action: PayloadAction<{ id: string; comment: string; dateString: string }>
    ) => {
      for (let i = 0; i < state.comments.length; i++) {
        dfsEdit(
          action.payload.id,
          state.comments[i],
          action.payload.comment,
          action.payload.dateString
        );
      }
    },
    addCommentAction: (
      state,
      action: PayloadAction<{
        parentId: string | null;
        comment: SingleCommentInterface;
      }>
    ) => {
      if (!action.payload.parentId) state.comments.push(action.payload.comment);
      else {
        for (let i = 0; i < state.comments.length; i++) {
          dfsAdd(action.payload.parentId, action.payload.comment);
        }
      }
    },
    buildCommentTreeAction: (state, action: PayloadAction<{comments: SingleCommentInterface[]}>) => {
        const data: Record<string, CommentStruct[]> = {};
        for (let i=0 ; i<action.payload.comments.length; i++) {
          const comment = action.payload.comments[i];
          if (comment.parentId) {
            if (!data[comment.parentId]) data[comment.parentId] = []
            data[comment.parentId].push(comment);
          }
        }

        let outputArray: CommentStruct[] = [];
        for (let i = 0; i < action.payload.comments.length; i++) {
          const comment: CommentStruct = action.payload.comments[i];
          if (data[comment.id] && data[comment.id].length) {
            comment.replys = data[comment.id];
          } else {
            outputArray.push(comment);
          }
        } 
        state.comments = outputArray;
    }
  }
});

export const { deleteCommentAction, editCommentAction, addCommentAction } = commentSlice.actions;

export default commentSlice.reducer;