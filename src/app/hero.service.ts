import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {
  // This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET heroes from the server */
  // HttpClient.get returns the body of the response as an untyped JSON object by default.
  // Applying the optional type specifier, <Hero[]> , gives you a typed result object.
  // Other APIs may bury the data that you want within an object.
  // You might have to dig that data out by processing the Observable result with the RxJS map operator.
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      // The HeroService methods will tap into the flow of observable values and send a message (via log()) to the message area at the bottom of the page.
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
  private heroesUrl = 'api/heroes';  // URL to web api

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */

  // After reporting the error to console, the handler constructs a user friendly message and returns a safe value to the app so it can keep working.
  // Because each service method returns a different kind of Observable result, errorHandler() takes a type parameter so it can return the safe value as the type that the app expects.
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
