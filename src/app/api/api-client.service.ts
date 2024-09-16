import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CacheService } from '../cache/cache.service'; 

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cache: CacheService) {}

  // GET all posts
  getPosts(): Observable<any> {
    const cachedData = this.cache.get('posts');
    if (cachedData) {
      return of(cachedData);
    }
  
    return this.http.get(`${this.apiUrl}/posts`).pipe(
      tap((data) => this.cache.set('posts', data)),
      catchError(this.handleError)
    );
  }

  // GET post by ID
  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // GET comments for a post by post ID
  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments?postId=${postId}`).pipe(
      catchError(this.handleError)
    );
  }

  // CREATE new post
  createPost(postData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, postData).pipe(
      catchError(this.handleError)
    );
  }

  // UPDATE post by ID
  updatePost(id: number, postData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, postData).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE post by ID
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
