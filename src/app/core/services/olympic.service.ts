import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, retry, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json'
  private olympics$ = new BehaviorSubject<Olympic[]>([])

  constructor(private http: HttpClient) {}
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        console.log(this.olympics$)
        this.olympics$.next(value)
      }),
      retry(5),
      catchError(this.handleError)
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured', error.error)
    } else {
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      )
    }
    return throwError(() => new Error('Something bad happend: please try again later.'))
  }
}
