import { Dish } from "../business/dish";
import { Client } from "../users/client";

export class DishRecommendation {
    id: number;
    dish: Dish;
    description: string
    receivers: Client[];
}