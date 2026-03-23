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
  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<Options | null>();

  public selectedValue: string | null = null;

  onValueChange(event: Options | null) {
    // Busca la opción seleccionada en el array de opciones utilizando el valor del evento
    const selectedOption = this.options.find(opt => opt.value === event?.value) || null;
    if (selectedOption) {
      this.valueChange.emit(selectedOption);
    }
  }
}
