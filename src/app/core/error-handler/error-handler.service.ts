import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  // Handle HTTP errors
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // Show error message in a snackbar
    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000,
    });

    return throwError(errorMessage);
  }
}
