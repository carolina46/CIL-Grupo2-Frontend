import { Category } from "./category";
import { Menu } from "./menu";
import { Location } from './location';
import { CommentFilter } from "../filter/comment_filter";
import { NotificationFilter } from '../filter/notification_filter';
import { Comment } from '..//comment';

export class Restaurant {
    oid: number;
    name: string;
    category: Category;
    menus: Menu[];
    comments: Comment[];
    location: Location;
    commentFilter: CommentFilter;
    notificationFilter: NotificationFilter;
}