import { RouterLink } from "@angular/router";
import { expand } from "rxjs";

interface NavItem {
  routeLink?: string;
  label: string;
  image?: string;
  icon?: string;
  expanded?: boolean;
  children?: NavItem[];
}


export const navbarData : NavItem[] = [
  {
    routeLink: '/dashboard',
    icon: 'fal fa-home',
    label: 'DASHBOARD',
     image: 'assets/icons/dashboard-icon.png'
  },
  {
    routeLink: '',
    icon: 'fal fa-box',
    label: 'ESTOQUE',
    expanded: false,
    image: 'assets/icons/estoque-icon.png',

    children: [
      { label: 'Produtos', routeLink: '/estoque/produtos' },
      { label: 'Categorias', routeLink: '/estoque/categorias' },
      { label: 'Entrada E Saida', routeLink: '/estoque/movimentacoes' },
      { label: 'Fornecedores', routeLink: '/estoque/fornecedores' },
      { label: 'Relatorio', routeLink: '/estoque/relatorio' }

    ]
  },
  {
    routeLink: '/vendas',
    icon: 'fal fa-chart-bar',
    label: 'VENDAS',
    image: 'assets/icons/vendas-icon.png',
    children: [
      { routeLink : 'vendas/pedidos', label : 'Pedidos'},
      { routeLink : 'vendas/clientes', label : 'Clientes'},
      { routeLink : 'vendas/pagamentos', label : 'Pagamentos'},
      { routeLink : 'vendas/nfe', label : 'NF-E'},
      { routeLink : 'vendas/relatorio', label : 'Relatorio'}

    ]
  },
  {
    routeLink: '/pdv',
    icon: 'fal fa-tags',
    label: 'PDV',
    image: 'assets/icons/pdv-icon.png',
  },
  {
    routeLink: '/administrador',
    icon: 'fal fa-file',
    label:'ADMINISTRADOR',
    expanded: false,
    image: 'assets/icons/adm-icon.png',
    children: [
      { routeLink : 'aministracao/usuaario', label : 'Usuários'},
      { routeLink : 'aministracao/logs', label : 'Logs de Sistema'},
      { routeLink : 'aministracao/configuracao', label : 'Configuração'}

    ]
  },

  {
    routeLink: '/settings',
    icon: 'fal fa-cog',
    label: 'SETTINGS',
    image: 'assets/icons/config-icon.png',
  }

];


