import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentModel, PostModel } from '../model/model'

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseUrl = `https://jsonplaceholder.typicode.com/`;

    constructor(private http: HttpClient) { }

    public getAllPosts(): Observable<PostModel[]> {
        return this.http.get<PostModel[]>(`${this.baseUrl}posts`);
    }

    public getPostById(id: number): Observable<PostModel> {
        return this.http.get<PostModel>(`${this.baseUrl}posts/${id}`);
    }

    public getPostCommentsById(id: number): Observable<CommentModel[]> {
        return this.http.get<CommentModel[]>(`${this.baseUrl}posts/${id}/comments`);
    }

    public savePost(post: PostModel): Observable<string> {
        return this.http.post<string>(this.baseUrl + 'posts', post);
    }

    public deletePost(id: number): Observable<string> {
        return this.http.delete<string>(`${this.baseUrl}posts/${id}`);
    }
}
