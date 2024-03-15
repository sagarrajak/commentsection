export interface SingleCommentInterface {
    comment: string;
    createdDate: string;
    userName: string;
    editedDate: string;
    id: string;
    parentId: string | null
}



export type CommentStruct = {
    replys?: CommentStruct[]
} & SingleCommentInterface

