import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Fund, Subscriptions } from '../models';

@Injectable({
  providedIn: 'root'
})

// Servicio para manejar las operaciones relacionadas con las suscripciones, como obtener la lista de suscripciones, agregar nuevas suscripciones y eliminar suscripciones existentes.
export class SubscriptionsService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/subscriptions';

  getSubscriptions(): Observable<Subscriptions[]> {
    return this.http.get<Subscriptions[]>(this.url).pipe(
      catchError(error => {
        console.error('Error al obtener suscripciones:', error);
        return throwError(() => error);
      })
    );
  }

  addSubscription(body:Fund): Observable<Fund> {
    return this.http.post<Fund>(this.url, body).pipe(
      catchError(error => {
        console.error('Error al agregar suscripción:', error);
        return throwError(() => error);
      })
    );
  }

  deleteSubscription(id: number): Observable<{}> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar suscripción:', error);
        return throwError(() => error);
      })
    );
  }
}
