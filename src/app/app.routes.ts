import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StockMasterComponent } from './pages/stock-master/stock-master.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'stock-master',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/stock-master/stock-master.component').then(m => m.StockMasterComponent),
    children: [
      {
        path: 'estoque/produtos',
        loadComponent: () =>
          import('./pages/estoque/produtos/produtos.component').then(m => m.ProdutosComponent)
      },
      {
        path: 'estoque/categorias',
        loadComponent: () =>
          import('./pages/estoque/categorias/categorias.component').then(m => m.CategoriasComponent)
      },
      // outros filhos aqui...
    ]
  }
];
