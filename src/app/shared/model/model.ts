export class PostModel {
    userId: number;
    id: number;
    title: string;
    body: string;
    checked?: boolean;
}

export class CommentModel {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}