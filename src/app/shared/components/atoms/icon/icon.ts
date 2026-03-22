import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-atom-icon',
  imports: [],
  standalone: true,
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconAtomComponent {
  @Input() iconClass: string = '';
 }
