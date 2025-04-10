import { Component } from '@angular/core';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock-master',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './stock-master.component.html',
  styleUrl: './stock-master.component.scss'
})
export class StockMasterComponent {

  collapsed: boolean = false; // ou false, dependendo da lógica
  navData = navbarData;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  toggleSubmenu(item: any) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
