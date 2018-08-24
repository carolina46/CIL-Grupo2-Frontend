import { Tag } from "./tag";

export class TagSelected {
    oid: number;
    name: string;
    selected: boolean;

    constructor(tag : Tag){
        this.oid = tag.oid;
        this.name = tag.name;
        this.selected = false;
    }

    getTag(): Tag{
        let tag = new Tag();
        tag.name = this.name;
        tag.oid = this.oid;
        return tag;
    }
}
