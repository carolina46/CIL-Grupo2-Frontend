import { Category } from "./category";
import { Menu } from "./menu";
import { Comment } from "./comment";
import { CommentFilter } from "../filter/commentfilter";
import { NotificationFilter } from "../filter/notificationfilter";

export class Restaurant {
    id: number;
    name: string;
    category: Category;
    menus: Menu[];
    location: Location;
    comments: Comment[];
    commentFilter: CommentFilter;
    notificationFilter: NotificationFilter;
}