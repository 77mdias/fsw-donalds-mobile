import { useContext } from "react";

import { DrawerContext } from "../contexts/drawer";

const useDrawer = () => {
  const { isOpen, onOpenChange } = useContext(DrawerContext);

  return { isOpen, onOpenChange };
};

export { useDrawer };