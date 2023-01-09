import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "./firebase";

export const deleteComment = async (commentId) => {
  await deleteDoc(doc(dbService, "comment", commentId));
};

export const editComment = async ({ commentId, editingObj }) => {
  await updateDoc(doc(dbService, "comment", commentId), editingObj);
};
