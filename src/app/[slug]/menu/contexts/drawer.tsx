import { createContext } from "react";

interface DrawerContextType {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  onOpenChange: () => {},
});