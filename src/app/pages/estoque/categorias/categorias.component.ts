import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../../../service/categoriaService/categoria.service';
import { ToastrService } from 'ngx-toastr';

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
  subcategorias: any[] = [];

  mostrarTabela: boolean = false;

  novaCategoria = {
    name: ''
  };

  novaSubcategoria = {
    name: '',
    categoryId: ''
  };

  constructor(
    private categoriaService: CategoriaService,
    private toastService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.listarCategorias();


  }

  cadastrarCategoria(): void {
    this.categoriaService.cadastrarCategoria(this.novaCategoria).subscribe({
      next: () => {
        this.novaCategoria.name = '';
        this.listarCategorias();
        this.toastService.success("Categoria Cadastrada com Sucesso");
      },
      error: () =>
        this.toastService.error("Categoria Já existe")
      }
    );
  }

  cadastrarSubcategoria(): void {
    console.log("Subcategoria enviada:", this.novaSubcategoria);
    this.categoriaService.cadastrarSubcategoria(this.novaSubcategoria).subscribe({
      next: () => {
      this.novaSubcategoria.name = '';
      this.novaSubcategoria.categoryId = '';
      console.log("sucesso!")
      this.toastService.success("SubCategoria Cadastrada com Sucesso");
    },
    error: () =>
      this.toastService.error("SubCategoria Já existe")
    }

    );
  }

  listarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe((data) => {
      this.categorias = data;
      this.mostrarTabela = true;
    });
  }

  listarSubCategorias(): void {
    this.categoriaService.listarSubCategorias().subscribe((data) => {
      console.log('Subcategorias recebidas:', data);
      this.subcategorias = data;
      this.mostrarTabela = true;

    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  fecharLista(){
    this.mostrarTabela = false;
  }



}
