import { Tag } from "./tag";

export class Dish {
    oid: number;
    name: string;
    description: string;
    picture: Blob;
    tags: Tag[]; 
}