import { Tag } from "./tag";

export class Dish {
    id: number;
    name: string;
    description: string;
    picture: string;
    tags: Tag[]; 
}