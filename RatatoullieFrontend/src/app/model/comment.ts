import { Restaurant } from "./business/restaurant";

export class Comment {
    id: number;
    description: string;
    date: string;
    restaurant: Restaurant;
}