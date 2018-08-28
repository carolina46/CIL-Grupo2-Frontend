import { User } from "./user";
import { Ranking } from "../Ranking/ranking";
import { DishRecommendation } from "../recommendation/dish_recommendation";
import { MenuRecommendation } from "../recommendation/menu_recommendation";
import { RestaurantRecommendation } from "../recommendation/restaurant_recommendation";
import { DishVote } from "../vote/dish-vote";
import { MenuVote } from "../vote/menu-vote";
import { RestaurantVote } from "../vote/restaurant-vote";

export abstract class Client extends User{
    location : Location;
	ranking : Ranking;
	friends : Client[];
	dishVotes : DishVote[];
	menuVotes : MenuVote[];
	restaurantVotes : RestaurantVote[];
	comments : Comment[];
	dishRecommendations : DishRecommendation[];
	menuRecommendations : MenuRecommendation[];
	restaurantRecommendations : RestaurantRecommendation[];
}
