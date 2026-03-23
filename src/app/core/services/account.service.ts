import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Servicio para manejar las operaciones relacionadas con la cuenta bancaria, como obtener el saldo actual y actualizarlo.
export class AccountService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/account';

  getCurrentBalance(): Observable<{balance: number}> {
    return this.http.get<{balance: number}>(this.url).pipe(
      catchError(error => {
        console.error('Error en la petición de saldo:', error);
        return throwError(() => error);
      })
    );
  }

  updateBalance(newBalance: number): Observable<{balance: number}> {
    return this.http.patch<{balance: number}>(this.url, { balance: newBalance }).pipe(
      catchError(error => {
        console.error('Error en la actualización de saldo:', error);
        return throwError(() => error);
      })
    );
  }
}
