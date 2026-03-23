import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { LabelAtomComponent } from '@shared/atoms';
import { ButtonIconMoleculeComponent } from '@shared/molecules';
import { TableColumn, TableOrganismComponent } from '@shared/organisms';
import { Subscriptions, SubscriptionTable } from 'src/app/core/models';
import { AccountService } from 'src/app/core/services/account.service';
import { HistoryService } from 'src/app/core/services/history.service';
import { NotificationService } from 'src/app/core/services/notifications.service';
import { SubscriptionsService } from 'src/app/core/services/subscriptions.service';

@Component({
  selector: 'app-subscriptions',
  imports: [LabelAtomComponent, ButtonIconMoleculeComponent, TableOrganismComponent, CurrencyPipe],
  standalone: true,
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsComponent implements OnInit {
  private accountService = inject(AccountService);
  private subscriptionsService = inject(SubscriptionsService);
  private notificationService = inject(NotificationService);
  private historyService = inject(HistoryService);
  public columns: TableColumn<SubscriptionTable>[] = [
    { field: 'fundID', header: 'ID' },
    { field: 'name', header: 'Nombre' },
    { field: 'min_amount', header: 'Monto Mínimo', pipe: 'currency' },
    { field: 'category', header: 'Categoría' },
    { field: 'notificationMethod', header: 'Método de Notificación' },
    { field: 'date', header: 'Fecha de Suscripción', pipe: 'date' },
  ];
  public selectedSubscription: Subscriptions | null = null;
  public currentBalance = signal<number>(500000);
  public subscriptions = signal<SubscriptionTable[]>([]);

  ngOnInit(): void {
    this.getSubscriptions();
    this.getCurrentBalance();
  }

  onOpenModal(subscription: Subscriptions) {
    this.selectedSubscription = subscription;

    this.notificationService.showQuestion(
      `¿Deseas cancelar tu suscripción al fondo ${subscription.name}?`,
    ).then((confirmed) => {
      if (confirmed) {
        if (subscription.id) {
          this.deleteSubscription(subscription.id);
          this.notificationService.showSuccess(`Has cancelado tu suscripción a ${subscription.name}.`);

          // Actualizar el saldo actual sumando el monto mínimo del fondo cancelado, asegurándose de que el saldo no sea negativo.
          const newBalance = Math.max(0, this.currentBalance() + subscription.min_amount);
          this.updateBalance(newBalance);

          // Registrar el movimiento de cancelación en el historial de suscripciones.
          const { id, ...dataWithoutId } = subscription;
          const historyData = {
            ...dataWithoutId,
            fundID: id.toString(),
            notificationMethod: subscription.notificationMethod
          };
          this.historyService.addHistory(historyData, 'Cancelación').subscribe({
            next: () => {
              console.info('Movimiento registrado en el historial');
            },
            error: (error) => {
              console.error('Error al registrar el movimiento en el historial:', error);
            }
          });
        }
      }
    });
  }

  private getCurrentBalance() {
    this.accountService.getCurrentBalance().subscribe({
      next: (response) => {
        this.currentBalance.set(response.balance); // Establecer el saldo actual obtenido del servidor en la señal.
      },
      error: (error) => {
        console.error('Error al obtener el saldo actual:', error);
        this.notificationService.showError(
          'No pudimos obtener tu saldo actual. Revisa tu conexión o intenta de nuevo más tarde.',
        );
      },
    });
  }

  private getSubscriptions() {
    this.subscriptionsService.getSubscriptions().subscribe({
      next: (data) => {
        // Ordenar las suscripciones por fecha de manera descendente (de más reciente a más antiguo) antes de establecerlas en la señal.
        let transformedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.subscriptions.set(transformedData);
      },
      error: (error) => {
        console.error('Error al obtener suscripciones:', error);
        this.notificationService.showError('Error al obtener suscripciones. Por favor, inténtalo de nuevo más tarde.');
      }
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

  private deleteSubscription(id: number) {
    this.subscriptionsService.deleteSubscription(id).subscribe({
      next: () => {
        this.getSubscriptions(); // Actualiza la lista de suscripciones después de eliminar
        this.notificationService.showSuccess('Suscripción cancelada exitosamente.');
      },
      error: (error) => {
        console.error('Error al eliminar suscripción:', error);
        this.notificationService.showError(
          'No pudimos cancelar tu suscripción. Revisa tu conexión o intenta de nuevo más tarde.',
        );
      },
    });
  }
}
