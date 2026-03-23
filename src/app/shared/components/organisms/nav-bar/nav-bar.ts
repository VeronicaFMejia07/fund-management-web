import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { IconAtomComponent, LabelAtomComponent } from "@shared/atoms";
import { NavLinkMoleculeComponent } from '@shared/molecules';

@Component({
  selector: 'app-organism-nav-bar',
  standalone: true,
  imports: [MenubarModule, IconAtomComponent, LabelAtomComponent, NavLinkMoleculeComponent],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarOrganismComponent {
  @Input() items: MenuItem[] = []; // Recibe los elementos del menú desde el componente padre
}
