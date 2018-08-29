import { Tag } from './tag';
import { MenuType } from './menu-type';
import { Dish } from './dish';

export class Menu {
    oid: number;
    name: string;
    tags: Tag[];
    type: MenuType;
    dishes : Dish[];
  }
