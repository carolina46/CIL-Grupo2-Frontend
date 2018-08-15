import { Tag } from "./tag";
import { MenuType } from "./menu-type";

export class Menu {
    constructor(
        public id: number,
        public name: string,
        public tag?: Tag[],
        public menuType?: MenuType,
    ) {}
}