import { Tag } from "./tag";
import { MenuType } from "./menu-type";

export class Menu {
    id: number;
    name: string;
    tags: Tag[];
    type: MenuType;
  }