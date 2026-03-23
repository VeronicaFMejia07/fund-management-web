import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { LabelAtomComponent } from "@shared/atoms";

export interface TableColumn<T> {
  field: keyof T | string;
  header: string;
  pipe?: 'currency' | 'date' | 'number';
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
  @ContentChild('actions') actionsTemplate?: TemplateRef<any>;

  public selectedRow: T | null = null;
}
