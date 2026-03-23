import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-organism-modal',
  standalone: true,
  imports: [DialogModule, CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalOrganismComponent {
  @Input() title: string = '';
  @Input() contentTemplate?: TemplateRef<any>; // Permite pasar una plantilla personalizada para el contenido del modal
  @Input() footerTemplate?: TemplateRef<any>; // Permite pasar una plantilla personalizada para el footer del modal
  @Input() visible: boolean = false; // Controla la visibilidad del modal

  @Output() visibleChange = new EventEmitter<boolean>(); // Emite cambios en la visibilidad del modal al componente padre

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
