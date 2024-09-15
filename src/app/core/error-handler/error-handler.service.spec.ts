import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { throwError } from 'rxjs';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(ErrorHandlerService);
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle client-side error', () => {
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Client-side error'
    });
    const errorResponse = new HttpErrorResponse({
      error: errorEvent,
      status: 0,
      statusText: 'Unknown Error'
    });

    service.handleError(errorResponse).subscribe(
      () => fail('expected an error, not data'),
      error => expect(error).toBe('Error: Client-side error')
    );

    expect(snackBar.open).toHaveBeenCalledWith('Error: Client-side error', 'Close', {
      duration: 3000,
    });
  });

  it('should handle server-side error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Server error',
      status: 500,
      statusText: 'Internal Server Error'
    });

    service.handleError(errorResponse).subscribe(
      () => fail('expected an error, not data'),
      error => expect(error).toBe('Error Code: 500\nMessage: Internal Server Error')
    );

    expect(snackBar.open).toHaveBeenCalledWith('Error Code: 500\nMessage: Internal Server Error', 'Close', {
      duration: 3000,
    });
  });

  it('should handle unknown error', () => {
    const errorResponse = new HttpErrorResponse({
      error: {},
      status: 0,
      statusText: 'Unknown Error'
    });

    service.handleError(errorResponse).subscribe(
      () => fail('expected an error, not data'),
      error => expect(error).toBe('An unknown error occurred!')
    );

    expect(snackBar.open).toHaveBeenCalledWith('An unknown error occurred!', 'Close', {
      duration: 3000,
    });
  });
});
