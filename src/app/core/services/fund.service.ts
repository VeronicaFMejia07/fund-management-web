import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Fund } from '../models';

@Injectable({
  providedIn: 'root'
})

// Servicio para manejar las operaciones relacionadas con los fondos, como obtener la lista de fondos disponibles.
export class FundService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/funds';

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.url).pipe(
      catchError(error => {
        console.error('Error en la petición de fondos:', error);
        return throwError(() => error);
      })
    );
  }
}
