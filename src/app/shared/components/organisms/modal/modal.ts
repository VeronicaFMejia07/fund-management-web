import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
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
 }
