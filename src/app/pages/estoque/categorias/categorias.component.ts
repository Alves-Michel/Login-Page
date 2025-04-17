import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../../../service/categoriaService/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
      CategoriaService
  ],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  isSidebarOpen: boolean = true; // Controla a abertura e fechamento da sidebar
  categorias: any[] = [];

  novaCategoria = {
    name: ''
  };

  novaSubcategoria = {
    name: '',
    categoryId: ''
  };

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  cadastrarCategoria(): void {
    this.categoriaService.cadastrarCategoria(this.novaCategoria).subscribe(() => {
      this.novaCategoria.name = '';
      this.listarCategorias();
    });
  }

  cadastrarSubcategoria(): void {
    this.categoriaService.cadastrarSubcategoria(this.novaSubcategoria).subscribe(() => {
      this.novaSubcategoria.name = '';
      this.novaSubcategoria.categoryId = '';
    });
  }

  listarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
