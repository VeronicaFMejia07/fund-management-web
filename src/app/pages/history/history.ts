import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { LabelAtomComponent } from '@shared/atoms';
import { TableColumn, TableOrganismComponent } from '@shared/organisms';
import { HistoryTable } from 'src/app/core/models';
import { AccountService } from 'src/app/core/services/account.service';
import { HistoryService } from 'src/app/core/services/history.service';
import { NotificationService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-history',
  imports: [LabelAtomComponent, TableOrganismComponent, CurrencyPipe],
  standalone: true,
  templateUrl: './history.html',
  styleUrl: './history.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  private accountService = inject(AccountService);
  private historyService = inject(HistoryService);
  private notificationService = inject(NotificationService);
  public history = signal<HistoryTable[]>([]);

  public columns: TableColumn<HistoryTable>[] = [
    { field: 'fundID', header: 'ID' },
    { field: 'type', header: 'Tipo Transacción' },
    { field: 'date', header: 'Fecha', pipe: 'date' },
    { field: 'name', header: 'Nombre' },
    { field: 'min_amount', header: 'Monto Mínimo', pipe: 'currency' },
    { field: 'category', header: 'Categoría' },
    { field: 'notificationMethod', header: 'Método de Notificación' },
  ];
  public currentBalance = signal<number>(500000);
  
  ngOnInit(): void {
    this.getCurrentBalance();
    this.getHistory();
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

  private getHistory() {
    this.historyService.getHistory().subscribe({
      next: (response) => {
        let transformedData = response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.history.set(transformedData);
      },
      error: (error) => {
        console.error('Error al obtener el historial:', error);
        this.notificationService.showError(
          'No pudimos obtener tu historial de transacciones. Revisa tu conexión o intenta de nuevo más tarde.',
        );
      },
    });
  }
}
