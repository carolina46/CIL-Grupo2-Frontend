import { Tag } from "./business/tag";
import { MenuType } from "./business/menu-type";

export class NewMenu {
    restaurant : number;
    name : string;
    tags : Tag[];
    type : number;
}