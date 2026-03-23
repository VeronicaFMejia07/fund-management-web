import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconAtomComponent, LabelAtomComponent } from "@shared/atoms";

@Component({
  selector: 'app-molecule-button-icon',
  imports: [IconAtomComponent, LabelAtomComponent],
  standalone: true,
  templateUrl: './button-icon.html',
  styleUrl: './button-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconMoleculeComponent {
  @Input() label: string = '';
  @Input() iconClass: string = '';

  @Output() onClick = new EventEmitter<MouseEvent>(); // Emitir el evento de clic al componente padre
}
