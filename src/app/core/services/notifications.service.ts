import { inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })

export class NotificationService {

  showError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2c3e50', 
      heightAuto: false
    });
  }

  showSuccess(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  showWarning(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true
    });
  }

  showQuestion(message: string): Promise<boolean> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: message,
      icon: 'question',
      showCancelButton: true, 
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#2c3e50',
      cancelButtonColor: '#bdc3c7',
      heightAuto: false
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}