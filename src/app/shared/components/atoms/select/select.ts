import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

export interface Options {
  name: string;
  value: string;
}

@Component({
  selector: 'app-atom-select',
  standalone: true,
  imports: [SelectModule, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectAtomComponent {
  @Input() options: Options[] = [];
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<string>();

  public selectedValue: string = "";

  onValueChange(value: string) {
    this.selectedValue = value;
    this.valueChange.emit(value);
  }
}
