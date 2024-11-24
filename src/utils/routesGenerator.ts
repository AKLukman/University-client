import { ReactNode } from "react";
import { TUserPaths } from "../types/sidebarItems.type";

type TRoutes = {
  path: string;
  element: ReactNode;
};

export const routesGenerator = (items: TUserPaths[]) => {
  // admin routes
  const routes = items.reduce((acc: TRoutes[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    } else if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};
