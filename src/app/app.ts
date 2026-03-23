import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarOrganismComponent } from '@shared/organisms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarOrganismComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fund-management-web');
  public menuItems:MenuItem[] = [
    {
      label: 'Fondos',
      routerLink: '/funds',
    },
    {
      label: 'Mis suscripciones',
      routerLink: '/subscriptions',
    },
    {
      label: 'Historial',
      routerLink: '/history',
    },
  ]
}
