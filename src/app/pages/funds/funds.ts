import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { SelectAtomComponent, LabelAtomComponent, Options } from '@shared/atoms';
import { ButtonIconMoleculeComponent } from '@shared/molecules';
import { ModalOrganismComponent, TableColumn, TableOrganismComponent } from '@shared/organisms';
import { Fund } from 'src/app/core/models';
import { FundService } from 'src/app/core/services/fund.service';
import { NotificationService } from 'src/app/core/services/notifications.service';
import { SubscriptionsService } from 'src/app/core/services/suscriptions.service';

@Component({
  selector: 'app-funds',
  imports: [
    ButtonIconMoleculeComponent,
    TableOrganismComponent,
    LabelAtomComponent,
    ModalOrganismComponent,
    SelectAtomComponent,
    CurrencyPipe,
  ],
  standalone: true,
  templateUrl: './funds.html',
  styleUrl: './funds.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundsComponent implements OnInit {
  private fundService = inject(FundService);
  private subscriptionsService = inject(SubscriptionsService);
  private notification = inject(NotificationService);
  public funds = signal<Fund[]>([]);
  public columns: TableColumn<Fund>[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nombre' },
    { field: 'min_amount', header: 'Monto Mínimo', pipe: 'currency' },
    { field: 'category', header: 'Categoría' },
  ];
  public isModalVisible = signal<boolean>(false);
  public selectedFund: any = null;
  public currentBalance = signal<number>(500000);
  public subscriptionOptions: Options[] = [
    { name: 'Email (Correo Electrónico)', value: 'email' },
    { name: 'SMS (Mensaje de Texto)', value: 'sms' },
  ];
  public selectedNotificationMethod: string = '';

  ngOnInit() {
    this.getFunds();
  }

  onSuscription(fundData: Fund) {
    const saldoActual = this.currentBalance();

    if (saldoActual < fundData.min_amount) {
      this.notification.showWarning(
        'Saldo insuficiente para este fondo. Intenta con otro o recarga tu cuenta.',
      );
      return;
    }

    // 2. Validación de Notificación
    if (!this.selectedNotificationMethod) {
      this.notification.showWarning(
        'Por favor, selecciona un método de notificación antes de continuar.',
      );
      return;
    }

    const body = {
      ...fundData,
      notificationMethod: this.selectedNotificationMethod,
      date: new Date().toISOString(),
    };

    this.addSubscription(body);
  }

  onOpenModal(fundData: Fund) {
    this.selectedFund = fundData;
    this.selectedNotificationMethod = '';
    this.isModalVisible.set(true);
  }

  onCloseModal() {
    this.isModalVisible.set(false);
    this.selectedFund = null;
  }

  onChangeNotificationMethod(event: string) {
    this.selectedNotificationMethod = event;
  }

  private getFunds() {
    this.fundService.getFunds().subscribe({
      next: (funds) => {
        this.funds.set(funds);
      },
      error: (error) => {
        console.error('Error al obtener los fondos:', error);
        this.notification.showError(
          'No pudimos cargar los fondos disponibles. Revisa tu conexión o intenta de nuevo más tarde.',
        );
      },
    });
  }

  private addSubscription(fundData: Fund) {
    this.subscriptionsService.addSubscription(fundData).subscribe({
      next: (response) => {
        this.currentBalance.update((prev) => {
          const resultado = prev - fundData.min_amount;
          return Math.max(0, resultado);
        });
        this.notification.showSuccess(`Te has suscrito exitosamente al fondo ${fundData.name}.`);
        this.selectedNotificationMethod = '';
        this.onCloseModal();
      },
      error: (error: HttpErrorResponse) => {
        this.onCloseModal();
        const errorBody = error?.error;
        const serverErrorMessage =
          typeof errorBody === 'object' ? JSON.stringify(errorBody) : errorBody || '';
        if (serverErrorMessage && serverErrorMessage.includes('duplicate id')) {
          this.notification.showWarning(
            'Ya estás suscrito a este fondo. No puedes suscribirte dos veces al mismo fondo.',
          );
        } else {
          this.notification.showError(
            'No pudimos procesar tu solicitud. Inténtalo de nuevo más tarde.',
          );
        }
      },
    });
  }
}
