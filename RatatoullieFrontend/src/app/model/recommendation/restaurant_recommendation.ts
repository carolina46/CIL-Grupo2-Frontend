import { Restaurant } from "../business/restaurant";

export class RestaurantRecommendation {
    id: number;
    restaurant: Restaurant;
    description: string
    receivers: Client[];
}