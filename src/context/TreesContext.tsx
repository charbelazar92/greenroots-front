import { createContext, useContext } from "react";
import type ITree from "../@types/trees";

type TreesContextType =
  | {
    trees: ITree[];
    isLoading: boolean;
    getTreeBySlug: (slug: string) => Promise<ITree | undefined>;
  }
  | undefined;

export const TreesContext = createContext<TreesContextType>(undefined);

export function useTrees() {
  const context = useContext(TreesContext);
  if (!context) {
    throw new Error("useTrees doit être utilisé dans un TreesProvider");
  }
  return context;
}