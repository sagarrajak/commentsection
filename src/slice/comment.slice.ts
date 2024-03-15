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
  dateString: string,
  userName: string
) {
  if (!comment) return false;
  if (comment.id === id) {
    comment.comment = commentMessage;
    comment.editedDate = dateString;
    comment.userName = userName;
    return true;
  }
  if (comment.replys) {
    for (let i = 0; i < comment.replys.length; i++) {
      const singleComment = comment.replys[i];
      if (dfsEdit(id, singleComment, commentMessage, dateString, userName)) {
        break;
      }
    }
  }
  return false;
}

function dfsAdd(
  parentId: string,
  comment: CommentStruct,
  commentToAdd: CommentStruct
) {
  if (!comment) return false;
  if (comment.id === parentId) {
    if (!comment.replys) comment.replys = [];
    comment.replys.push(commentToAdd);
    return true;
  }
  if (comment.replys) {
    for (let i = 0; i < comment.replys.length; i++) {
      const singleComment = comment.replys[i];
      dfsAdd(parentId, singleComment, commentToAdd);
    }
  }
  return false;
}

function buildDfsTree(comments: SingleCommentInterface[]) {
  const data: Record<string, CommentStruct[]> = {};
  const outputNode: CommentStruct[] = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment.parentId) {
      if (!data[comment.parentId]) data[comment.parentId] = [];
      data[comment.parentId].push(comment);
    } else {
      outputNode.push(comment);
    }
  }

  const dfsHelper = (node: CommentStruct) => {
    if (data[node.id]) {
      node.replys = data[node.id];
      for (let i = 0; i < node.replys.length; i++) {
        dfsHelper(node.replys[i]);
      }
    }
  };

  for (let obj of outputNode)
    dfsHelper(obj)

  return outputNode;
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
        if (state.comments[i].id === action.payload.id) {
          state.comments.splice(i, 1);
        } else {
          dfsDelete(action.payload.id, state.comments[i]);
        }
      }
    },
    editCommentAction: (
      state,
      action: PayloadAction<{ id: string; comment: string; dateString: string, userName: string}>
    ) => {
      for (let i = 0; i < state.comments.length; i++) {
        dfsEdit(
          action.payload.id,
          state.comments[i],
          action.payload.comment,
          action.payload.dateString,
          action.payload.userName
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
          dfsAdd(
            action.payload.parentId,
            state.comments[i],
            action.payload.comment
          );
        }
      }
    },
    buildCommentTreeAction: (
      state,
      action: PayloadAction<{ comments: SingleCommentInterface[] }>
    ) => {
      state.comments = buildDfsTree(action.payload.comments);
      console.log({ data: state.comments });
    },
  },
});

export const {
  deleteCommentAction,
  editCommentAction,
  addCommentAction,
  buildCommentTreeAction,
} = commentSlice.actions;

export default commentSlice.reducer;
