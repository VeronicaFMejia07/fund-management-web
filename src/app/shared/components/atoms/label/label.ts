import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-atom-label',
  standalone: true,
  imports: [],
  templateUrl: './label.html',
  styleUrl: './label.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelAtomComponent {
  @Input() text: string = '';
}
