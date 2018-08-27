import { Category } from "./category";
import { Menu } from "./menu";
import { Location } from './location';
import { CommentFilter } from "../filter/comment_filter";
import { NotificationFilter } from "../filter/notification_filter";

export class Restaurant {
    oid: number;
    name: string;
    category: Category;
    menus: Menu[];
    location: Location;
    commentFilter: CommentFilter;
    notificationFilter: NotificationFilter;
}