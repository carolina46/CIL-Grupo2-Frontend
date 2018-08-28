import { CommentFilter } from "./comment_filter";

export class CompositeCommentFilter extends CommentFilter {
//name: string;
configurationFilters : CommentFilter[];
}