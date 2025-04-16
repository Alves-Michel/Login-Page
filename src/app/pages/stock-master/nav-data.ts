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
    routeLink: '/stock-master/dashboard',
    icon: 'fal fa-home',
    label: 'DASHBOARD',
     image: 'assets/icons/dashboard.png'
  },
  {
    routeLink: '',
    icon: 'fal fa-box',
    label: 'ESTOQUE',
    expanded: false,
    image: 'assets/icons/ready-stock.png',

    children: [
      { label: 'Produtos', routeLink: '/stock-master/estoque/produtos' },
      { label: 'Categorias', routeLink: '/stock-master/estoque/categorias' },
      { label: 'Entrada E Saida', routeLink: '/stock-master/estoque/movimentacoes' },
      { label: 'Fornecedores', routeLink: '/stock-master/estoque/fornecedores' },
      { label: 'Relatorio', routeLink: '/stock-master/estoque/relatorio' }

    ]
  },
  {
    routeLink: '/vendas',
    icon: 'fal fa-chart-bar',
    label: 'VENDAS',
    image: 'assets/icons/revenue.png',
    children: [
      { routeLink : '/stock-master/vendas/pedidos', label : 'Pedidos'},
      { routeLink : '/stock-master/vendas/clientes', label : 'Clientes'},
      { routeLink : '/stock-master/vendas/pagamentos', label : 'Pagamentos'},
      { routeLink : '/stock-master/vendas/nfe', label : 'NF-E'},
      { routeLink : '/stock-master/vendas/relatorio', label : 'Relatorio'}

    ]
  },
  {
    routeLink: '/stock-master/pdv',
    icon: 'fal fa-tags',
    label: 'PDV',
    image: 'assets/icons/business-automation.png',
  },
  {
    routeLink: '/administrador',
    icon: 'fal fa-file',
    label:'ADMINISTRADOR',
    expanded: false,
    image: 'assets/icons/security.png',
    children: [
      { routeLink : '/stock-master/aministrador/usuario', label : 'Usuários'},
      { routeLink : '/stock-master/aministrador/logs', label : 'Logs de Sistema'},
      { routeLink : '/stock-master/aministrador/configuracao', label : 'Configuração'}

    ]
  },

  {
    routeLink: '/stock-master/settings',
    icon: 'fal fa-cog',
    label: 'SETTINGS',
    image: 'assets/icons/settings.png',
  }

];


