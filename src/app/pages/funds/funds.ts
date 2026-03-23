import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { SelectAtomComponent, LabelAtomComponent, Options } from '@shared/atoms';
import { ButtonIconMoleculeComponent } from '@shared/molecules';
import { ModalOrganismComponent, TableColumn, TableOrganismComponent } from '@shared/organisms';
import { Fund } from 'src/app/core/models';
import { AccountService } from 'src/app/core/services/account.service';
import { FundService } from 'src/app/core/services/fund.service';
import { HistoryService } from 'src/app/core/services/history.service';
import { NotificationService } from 'src/app/core/services/notifications.service';
import { SubscriptionsService } from 'src/app/core/services/subscriptions.service';

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
  private accountService = inject(AccountService);
  private notificationService = inject(NotificationService);
  private historyService = inject(HistoryService);
  public columns: TableColumn<Fund>[] = [ // Definición de las columnas para la tabla de fondos, incluyendo el formato de moneda para el monto mínimo.
    { field: 'fundID', header: 'ID' },
    { field: 'name', header: 'Nombre' },
    { field: 'min_amount', header: 'Monto Mínimo', pipe: 'currency' },
    { field: 'category', header: 'Categoría' },
  ];
  public selectedFund: Fund | null = null;
  public selectedNotificationMethod: string | null = null;
  public funds = signal<Fund[]>([]);
  public isModalVisible = signal<boolean>(false);
  public currentBalance = signal<number>(500000);
  public subscriptionOptions: Options[] = [
    { name: 'Email (Correo Electrónico)', value: 'email' },
    { name: 'SMS (Mensaje de Texto)', value: 'sms' },
  ];

  ngOnInit() {
    this.getFunds();
    this.getCurrentBalance();
  }

  onSuscription(fundData: Fund | null) {
    if (!fundData) return;

    const saldoActual = this.currentBalance();

    // 1. Validación del saldo actual.
    if (saldoActual < fundData.min_amount) {
      this.notificationService.showWarning(
        'Saldo insuficiente para este fondo. Intenta con otro o recarga tu cuenta.',
      );
      return;
    }

    // 2. Validación del campo de método de notificación.
    if (!this.selectedNotificationMethod) {
      this.notificationService.showWarning(
        'Por favor, selecciona un método de notificación antes de continuar.',
      );
      return;
    }

    // 3. Preparar los datos para la suscripción, incluyendo la conversión del valor seleccionado del método de notificación a su etiqueta correspondiente.
    const methodLabel = this.subscriptionOptions.find(opt => opt.value === this.selectedNotificationMethod)?.name;
    const body = {
      ...fundData,
      notificationMethod: methodLabel!,
      date: new Date().toISOString(),
    };

    this.addSubscription(body);
  }

  onOpenModal(fundData: Fund) {
    this.selectedNotificationMethod = null;
    this.selectedFund = fundData;
    this.isModalVisible.set(true);
  }

  onCloseModal() {
    this.isModalVisible.set(false);
    this.selectedFund = null;
  }

  onChangeNotificationMethod(event: Options | null) {
    if(!event) return;
    this.selectedNotificationMethod = event.value;
  }

  private getFunds() {
    this.fundService.getFunds().subscribe({
      next: (funds) => {
        this.funds.set(funds);
      },
      error: (error) => {
        console.error('Error al obtener los fondos:', error);
        this.notificationService.showError(
          'No pudimos cargar los fondos disponibles. Revisa tu conexión o intenta de nuevo más tarde.',
        );
      },
    });
  }

  private getCurrentBalance() {
    this.accountService.getCurrentBalance().subscribe({
      next: (response) => {
        this.currentBalance.set(response.balance);
      },
      error: (error) => {
        console.error('Error al obtener el saldo actual:', error);
        this.notificationService.showError(
          'No pudimos obtener tu saldo actual. Revisa tu conexión o intenta de nuevo más tarde.',
        );
      },
    });
  }

  private updateBalance(newBalance: number) {
    this.accountService.updateBalance(newBalance).subscribe({
      next: () => {
        this.currentBalance.set(newBalance);
      },
      error: (error) => {
        console.error('Error al actualizar el saldo:', error);
        this.notificationService.showError(
          'No pudimos actualizar tu saldo. Revisa tu conexión o intenta de nuevo más tarde.',
        );
      },
    });
  }

  private addSubscription(fundData: Fund) {
    this.subscriptionsService.addSubscription(fundData).subscribe({
      next: (response) => {
        // Actualizar el saldo restando el monto mínimo del fondo al saldo actual.
        const newBalance = Math.max(0, this.currentBalance() - fundData.min_amount);
        this.updateBalance(newBalance);

        this.notificationService.showSuccess(`Te has suscrito exitosamente al fondo ${fundData.name}.`);

        // Registrar el movimiento en el historial de suscripciones.
        this.historyService.addHistory(fundData, 'Suscripción').subscribe({
          next: () => {
            console.info('Movimiento registrado en el historial');
          },
          error: (error) => {
            console.error('Error al registrar el movimiento en el historial:', error);
          }
        });
        this.selectedNotificationMethod = null;
        this.onCloseModal();
      },
      error: (error: HttpErrorResponse) => {
        this.onCloseModal();
        console.error('Error al obtener el historial:', error);
        this.notificationService.showError(
          'No pudimos procesar tu solicitud. Inténtalo de nuevo más tarde.',
        );
      },
    });
  }
}
