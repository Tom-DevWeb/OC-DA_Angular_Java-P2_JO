import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, retry, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json'
  private olympics$ = new BehaviorSubject<Olympic[]>([])

  constructor(private http: HttpClient, private router: Router) {
  }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value)
      }),
      retry(5),
      catchError(this.handleError)
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getDetailsByCountry(country: string): Observable<Olympic> {
    return this.olympics$.pipe(
      map((olympics) => {
        const foundOlympic = olympics.find(
          (olympic) => olympic.country === country,
        )
        if (!foundOlympic) {
          console.log('error')
          this.router.navigateByUrl('/404')
          throw new Error('Country not found')
        }
        return foundOlympic
      }),
      catchError(() => {
        return throwError(() => new Error('Country not found!'))
      })
    )
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
