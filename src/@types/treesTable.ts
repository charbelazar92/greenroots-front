import type ITree from "./trees";

export default interface ITreeTable {
  trees: ITree[];
  onEdit: (tree: ITree) => void;
  onDelete: (tree: ITree) => void;
}