import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Fund, History, Subscriptions } from '../models';

@Injectable({
  providedIn: 'root'
})

// Servicio para manejar las operaciones relacionadas con el historial de suscripciones y cancelaciones, como obtener el historial y agregar nuevas entradas al historial.
export class HistoryService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/history';

  getHistory(): Observable<History[]> {
    return this.http.get<History[]>(this.url).pipe(
      catchError(error => {
        console.error('Error al obtener historial:', error);
        return throwError(() => error);
      })
    );
  }

  addHistory(fund: Fund, type: 'Suscripción' | 'Cancelación') {
    const body = {
      ...fund,
      date: new Date().toISOString(),
      type
    };
    return this.http.post(this.url, body).pipe(
        catchError(error => {
          console.error('Error al agregar historial:', error);
          return throwError(() => error);
        })
    );
  }
}
