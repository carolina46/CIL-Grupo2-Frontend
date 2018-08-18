import { Tag } from './tag';
import { MenuType } from './menu-type';

export class Menu {
    oid: number;
    name: string;
    tags: Tag[];
    type: MenuType;
  }
