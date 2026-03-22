import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LabelAtomComponent } from '@shared/atoms';

@Component({
  selector: 'app-molecule-nav-link',
  standalone: true,
  imports: [LabelAtomComponent, RouterLink],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLinkMoleculeComponent {
  @Input() link:string = '';
  @Input() label: string = '';
}
