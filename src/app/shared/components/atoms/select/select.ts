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
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<Options>();

  public selectedValue: string = "";

  onValueChange(event: Options) { // Recibe el evento con el nuevo valor seleccionado
    this.selectedValue = event.value;
    this.valueChange.emit(event);
  }
}
