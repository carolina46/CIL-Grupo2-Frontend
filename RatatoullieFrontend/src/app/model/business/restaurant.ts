import { Category } from "./category";
import { Menu } from "./menu";
//import { Comment } from "./comment";
import { CommentFilter } from "../filter/comment_filter";
import { NotificationFilter } from "../filter/notification_filter";

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