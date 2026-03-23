import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { LabelAtomComponent } from "@shared/atoms";

export interface TableColumn<T> {
  field: keyof T | string; // El campo del objeto que se mostrará en esta columna
  header: string; // El texto que se mostrará en el encabezado de la columna
  pipe?: 'currency' | 'date' | 'number'; // Opcional: el tipo de pipe a aplicar al valor de esta columna
}

@Component({
  selector: 'app-organism-table',
  standalone: true,
  imports: [TableModule, CommonModule, LabelAtomComponent],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOrganismComponent<T> {
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() showActions = true;
  @ContentChild('actions') actionsTemplate?: TemplateRef<any>; // Permite pasar una plantilla personalizada para las acciones de cada fila

  public selectedRow: T | null = null;
}
