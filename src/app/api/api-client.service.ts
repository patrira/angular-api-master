import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';  

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET all posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`).pipe(
      catchError(this.handleError)
    );
  }

  // GET single post by id
  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST to create a new post
  createPost(postData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, postData).pipe(
      catchError(this.handleError)
    );
  }

  // PUT to update an existing post
  updatePost(id: number, postData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, postData).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE a post
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling logic
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
