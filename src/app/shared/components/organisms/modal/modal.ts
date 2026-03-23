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
  @Input() contentTemplate?: TemplateRef<any>;
  @Input() footerTemplate?: TemplateRef<any>;
  @Input() visible: boolean = false; 

  @Output() visibleChange = new EventEmitter<boolean>();

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
